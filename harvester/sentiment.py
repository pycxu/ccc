import couchdb
from datetime import datetime
import re
import string
import json
import sys
import langdetect
from transformers import AutoModelForSequenceClassification
from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax
import csv
import urllib.request

couch = couchdb.Server("http://admin:admin@172.26.130.106:5984/")

#the location of raw twitter data with original json structure


def strip_ahref(text):
    y = re.sub("<a.*\">", "", text)
    x = re.sub("</a>", "", y)
    return x

def strip_links(text):
    link_regex = re.compile(
        r'((https?):((//)|(\\\\))+([\w\d:#@%/;$()~_?\+-=\\\.&](#!)?)*)', re.DOTALL)
    links = re.findall(link_regex, text)
    for link in links:
        text = text.replace(link[0], ', ')
    return text

#remove punctuation characters
def strip_all_entities(text):
    entity_prefixes = ['!', '?', ',', '.', '"']
    for separator in string.punctuation:
        if separator in entity_prefixes:
            text = text.replace(separator, ' ')
    return text

def preprocess(text):
    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)

def establish_model(model_load):

    tokenizer = AutoTokenizer.from_pretrained(model_load)
    model = AutoModelForSequenceClassification.from_pretrained(model_load)
    model.save_pretrained(model_load)
    return model, tokenizer

# def happiness_score(happinessdict,tweettext):
#     tweettextsplit = tweettext.split()
#     #wordcount = 0
#     worddict = 0
#     tweetscore = 0
#     avgtweetscore = 0
#     for wordtweet in tweettextsplit:
#         #wordcount = wordcount + 1
#         if(wordtweet.isupper()):
#             wordtweet = wordtweet.lower().strip()
#             if wordtweet in happinessdict.keys():
#                 dictscore = happinessdict[wordtweet]
#                 if(happinessdict[wordtweet]>0):
#                     dictscore = dictscore + 1
#                 elif(happinessdict[wordtweet]<0):
#                     dictscore = dictscore - 1
#                 tweetscore = tweetscore + dictscore
#                 worddict = worddict + 1
#         else:
#             wordtweet = wordtweet.lower().strip()
#             if wordtweet in happinessdict.keys():
#                 dictscore = happinessdict[wordtweet]
#                 tweetscore = tweetscore + dictscore
#                 worddict = worddict + 1
#     if(worddict > 0):
#         avgtweetscore = tweetscore/worddict
#     return avgtweetscore

def happiness_score(model, tokenizer, tweettext):
    text = preprocess(tweettext)
    encoded_input = tokenizer(text, return_tensors='pt')
    output = model(**encoded_input)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    labels = ['1 star','2 star','3 star','4 star','5 star']

    ranking = np.argsort(scores)
    ranking = ranking[::-1]
    happiness_score = 0
    for i in range(scores.shape[0]):
        l = labels[ranking[i]]
        s = scores[ranking[i]]
        if l == 'negative':
            happiness_score += -1 * s
        elif l == 'positive':
            happiness_score += s
        else:
            happiness_score += 0
    return happiness_score


def restructure_json_couchdb(couchdbdoc, model, tokenizer):
    tweet_text_stripped = strip_links(couchdbdoc['text'])
    tweet_text_stripped = strip_all_entities(tweet_text_stripped)
    #tweet_text = tweet_text_stripped.split()

    lang = ""
    try:
        lang = langdetect.detect(tweet_text_stripped)
    except :
        lang = "Not recognized"

    happiness = happiness_score(model, tokenizer,tweet_text_stripped)

    geotweet = []
    coortweet = []
    bounding_box = []
    place_name = ""
    place_full_name = ""
    place_country = ""

    if(couchdbdoc['geo']):
        geotweet = couchdbdoc['geo']['coordinates']
    else:
        geotweet = couchdbdoc['geo']

    if(couchdbdoc['coordinates']):
        coortweet = couchdbdoc['coordinates']['coordinates']
    else:
        coortweet = couchdbdoc['coordinates']
    
    if(couchdbdoc['place']):
        bounding_box = couchdbdoc['place']['bounding_box']['coordinates'][0]
        place_name= couchdbdoc['place']['name']
        place_full_name = couchdbdoc['place']['full_name']
        place_country = couchdbdoc['place']['country']
    else:
        bounding_box = couchdbdoc['place']
        place_name = couchdbdoc['place']
        place_full_name = couchdbdoc['place']
        place_country = couchdbdoc['place']
    
    y = re.sub(".*elbourne.*", "Melbourne", couchdbdoc['user']['location'])
    z = re.sub(".*risbane.*", "Brisbane", y)
    a = re.sub(".*erth.*", "Perth", z)
    b = re.sub(".*delaide.*", "Adelaide", a)
    c = re.sub(".*ydney.*", "Sydney", b)
    d = re.sub(".*ew South Wales.*", "New South Wales", c)
    e = re.sub(".*ueensland.*", "Queensland", d)
    f = re.sub(".*ictoria.*", "Victoria", e)
    g = re.sub(".*estern Australia.*", "Western Australia", f)
    loc = re.sub(".*outh Australia.*", "South Australia", g)

    text = {'_id': i,
            'created_at': couchdbdoc['created_at'],
            'text': couchdbdoc['text'],
            'source': strip_ahref(couchdbdoc['source']),
            'user_id': couchdbdoc['user']['id_str'],
            'user_screen_name': couchdbdoc['user']['screen_name'],
            'user_followers_count': couchdbdoc['user']['followers_count'],
            'user_friends_count': couchdbdoc['user']['friends_count'],
            'user_location': loc,
            'geo': geotweet,
            'coordinates': coortweet,
            'place_name': place_name,
            'place_full_name': place_full_name,
            'place_country': place_country,
            'place_bounding_box': bounding_box,
            'retweet_count': couchdbdoc['retweet_count'],
            'favorite_count': couchdbdoc['favorite_count'],
            'happines': happiness,
            'lang_detected': lang
            }
    return text

if __name__ == "__main__":
    model, tokenizer = establish_model("cardiffnlp/twitter-roberta-base-sentiment")

    list_word = open("AFINN.txt", "r")
    word = list_word.readlines()
    value = []
    key = []
    for kata in word:
        m = kata.split()
        if len(m) > 2:
            v = (' '.join((m[0:(len(m)-1)])))
            key.append(v.strip())
        else:
            key.append(m[0].strip())
        a = m[-1].strip()
        value.append(int(a))

    dict_words = dict(zip(key, value))

    list_word.close()
    count = 0

    for city in ['twitter_adelaide', 'twitter_sydney', 'twitter_melbourne', 'twitter_perth', 'twitter_brisbane']:
        db = couch[city]
        db2 = couch[city+'_processed']
        # the location of twitter data with additional variable and modified json structure
        for docid in db.view('_all_docs'):
            count = count + 1
            i = docid['id']
            doc = db[i]

            text = restructure_json_couchdb(doc,model,tokenizer)
            try:
                db2.save(json.loads(json.dumps(text)))
            except couchdb.http.ResourceConflict:
                pass

