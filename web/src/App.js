import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import request from "./utils/request";

function App() {


    useEffect(() => {
        const fetchData = async () => {
            await axios.get('http://admin:admin@172.17.0.4:5984/twitter_adelaide_processed/_design/sentiment/_view/ave_score', {
                headers: {
	                'Access-Control-Allow-Origin': '*',
	            },
            }).then(response => console.log("res: ", response))
//            const {data: d} = await axios({
//                method: 'get',
//                url: `http://admin:admin@172.17.0.4:5984/twitter_adelaide_processed/_design/sentiment/_view/ave_score`,
//                withCredentials: false,
//                headers: {
//                    'Access-Control-Allow-Origin': '*'
//                },
//            });
//            console.log("data", d)
        }
        fetchData()
    }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
