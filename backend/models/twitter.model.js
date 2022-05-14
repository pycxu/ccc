// Nano
const nano = require('nano')('http://admin:admin@172.26.130.106:5984/');

const getAveScore = (city, design, view) => {
    return new Promise((resolve, reject) => {
        const  db = nano.db.use('twitter_' + city + '_processed');
        db.view(design, view, (err, body) => {
            if(!err) {
                resolve(body.rows[0].value[0]);
            }else {
                reject(err);
            }
        });
    });
}

const findQuery = (dbName, mango) => {
    return new Promise((resolve, reject) => {
        const  db = nano.db.use(dbName);
        db.find(mango, (err, body) => {
            if(!err) {
                resolve(body);
            }else {
                reject(err);
            }
        })
    });
}

module.exports = {
    getAveScore,
    findQuery
};