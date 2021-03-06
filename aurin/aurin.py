import couchdb
import json

def aurin(db_name):
    couch = couchdb.Server('http://admin:admin@172.26.130.106:5984')
    try:
        couch.create(db_name)
        db = couch[db_name]
    except:
        db = couch[db_name]
    db_entry = {}

    with open(db_name + '.json') as jsonfile:
        jsondata = json.loads(jsonfile.read())
        db_entry = {}
        for data in jsondata['features']:
            db_entry = data['properties']
            db.save(json.loads(json.dumps(db_entry)))

if __name__ == "__main__":
    aurin('unemployment')
    aurin('income_cities')
    aurin('facility_num')