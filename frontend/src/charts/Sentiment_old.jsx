import { Chart, Interval, Tooltip } from 'bizcharts';
import { getSentiment } from '../utils/helper';
import { useState, useEffect } from 'react';

const Sentiment_old = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          await getSentiment().then(sentiment => {
            console.log("sentiment: ", sentiment);
            setData(sentiment);
            setIsLoading(false);
          });
        }
        fetchData();
    },[])

    if(isLoading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <Chart height={100} autoFit data={data} interactions={['active-region']} padding={[30, 30, 30, 50]} >
            <Interval position="city*sentiment" />
            <Tooltip shared />
        </Chart>
    );  
    
}

export default Sentiment_old;