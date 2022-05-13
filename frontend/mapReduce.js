curl -X PUT http://admin:admin@127.0.0.1:5984/twitter_adelaide/_design/happiness -d 
"{
       "views":
       {
              "city_lang":
              {
                     "map":"function(doc) { if((doc.lang_detected && doc.happines) && doc.lang_detected==='en') { emit(doc.lang_detected, doc.happines); }}",
                     "reduce":"function(keys, values) {return sum(values)/values.length}"
              }
       }
}"

curl -X GET http://admin:admin@127.0.0.1:5984/twitter_adelaide/_design/happiness/_view/ciry_lang