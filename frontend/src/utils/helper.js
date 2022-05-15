import request from "./request";
import axios from "axios";

const melbourne = request.get('melbourne', {});
const sydney = request.get('sydney', {});
const adelaide = request.get('adelaide', {});
const perth = request.get('perth', {});
const brisbane = request.get('brisbane', {});

export const getSentiment = async () => {
    let sentiment = [];
    await axios
        .all([ melbourne, sydney, adelaide, perth, brisbane])
        .then(
            axios.spread((...responses) => {
                let cities = ["Melbourne (C)", "Sydney (C)", "Adelaide (C)", "Perth (C)", "Brisbane (C)"];
                responses.forEach((element, index) => {
                    sentiment.push({
                        city: cities[index],
                        sentiment: element.data
                    })
                })
            })
        )
        .catch(err => console.log(err));
    return sentiment;
}

export const getIncome = async () => {
    const income = await axios.post('http://localhost:8000/api/v1/income_cities', {
        "selector": {
           
        },
        "fields": ["lga_name16", "mean_aud" ],
        "limit": 5,
        "skip": 0,
        "execution_stats": true
    });
    console.log("const income: ", income);
    return income.data.docs;
}

export const getIncomeWithSocre = async () => {

    const sentiment = await getSentiment();
    const income = await getIncome();
    let sentimentIncome = [];
    sentiment.map(row => {
        income.forEach(element => {
            if(element.lga_name16 === row.city){
                row['mean_aud'] = element.mean_aud/1000;
                sentimentIncome.push(row);
            }
        })
    })
    console.log('sentimentIncome: ', sentimentIncome);
    return sentimentIncome;
}

export const getUnemployment = async () => {
    const unemploymentRAW = await axios.post('http://localhost:8000/api/v1/unemployment', {
        "selector": {
           
        },
        "fields": ["gccsa_name_2016", "unemp_rt_15"],
        "limit": 5,
        "skip": 0,
        "execution_stats": true
    });
    const unemployment = [];
    unemploymentRAW.data.docs.forEach(element => {
        if(element.gccsa_name_2016.toUpperCase().includes('MELB')){
            unemployment.push({
                city: 'Melbourne (C)',
                unemp_rt: element.unemp_rt_15
            });
        }else if(element.gccsa_name_2016.toUpperCase().includes('SYDNEY')) {
            unemployment.push({
                city: 'Sydney (C)',
                unemp_rt: element.unemp_rt_15
            });
        }else if(element.gccsa_name_2016.toUpperCase().includes('ADE')){
            unemployment.push({
                city: 'Adelaide (C)',
                unemp_rt: element.unemp_rt_15
            });
        }else if(element.gccsa_name_2016.toUpperCase().includes('BRI')) {
            unemployment.push({
                city: 'Brisbane (C)',
                unemp_rt: element.unemp_rt_15
            });
        }else if(element.gccsa_name_2016.toUpperCase().includes('PER')) {
            unemployment.push({
                city: 'Perth (C)',
                unemp_rt: element.unemp_rt_15
            });
        }
    })
    console.log("unemployment: ", unemployment);
    return unemployment;
}

export const getUnemploymentWithSocre = async () => {
    const sentiment = await getSentiment();
    const unemployment = await getUnemployment();
    let sentimentUnemployment = [];
    sentiment.map(row => {
        unemployment.forEach(element => {
            if(element.city == row.city){
                row['unemp_rt'] = element.unemp_rt;
                sentimentUnemployment.push(row);
            }
        })
    })
    console.log('sentimentUnemployment: ', sentimentUnemployment);
    return sentimentUnemployment;
}

export const getFacility = async () => {
    const facility_num = await axios.post('http://localhost:8000/api/v1/facility_num', {
        "selector": {
           
        },
        "fields": ["lga_name16", "facility_num"],
        "limit": 5,
        "skip": 0,
        "execution_stats": true
    });
    console.log("facility_num: ", facility_num);
    return facility_num.data.docs;
}

export const getFacilityWithSocre = async () => {

    const sentiment = await getSentiment();
    const facility = await getFacility();
    let sentimentFacility = [];
    sentiment.map(row => {
        facility.forEach(element => {
            if(element.lga_name16 === row.city){
                row['facility_num'] = element.facility_num;
                sentimentFacility.push(row);
            }
        })
    })
    console.log('sentimentFacility: ', sentimentFacility);
    return sentimentFacility;
}