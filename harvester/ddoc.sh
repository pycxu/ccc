curl -X PUT http://admin:admin@172.17.0.4:5984/twitter_re/_design/happiness --data '{"views":{"city_lang":{"map":"function(doc){if((doc.lang_detected && doc.happines) && doc.lang_detected==='en') { emit(doc.lang_detected, doc.happines); }}","reduce":"function(keys, values) {return sum(values)/values.length}"}}}'

curl -X PUT http://admin:admin@172.17.0.4:5984/twitter_adelaide/_design/happiness --data '{"views":{"city_lang":{"map":"function(doc){if((doc.lang_detected && doc.happines) && doc.lang_detected==='en') { emit(doc.lang_detected, doc.happines); }}","reduce":"function(keys, values) {return sum(values)/values.length}"}}}'


curl -X GET http://admin:admin@172.17.0.4:5984/twitter_adelaide/_design/happiness/_view/city_lang