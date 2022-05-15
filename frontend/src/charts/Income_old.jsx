import { Chart, Interval, Tooltip } from 'bizcharts';
import { getIncome, getUnemployment } from '../utils/helper';
import { useState, useEffect } from 'react';

const Income_old = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          await getIncome().then(income => {
            console.log("income: ", income);
            setData(income);
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
            <Interval position="lga_name16*mean_aud" />
            <Tooltip shared />
        </Chart>
    );  
    
}

export default Income_old;