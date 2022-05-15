import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { getUnemployment } from "../utils/helper";

const Unemployment = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
       await getUnemployment().then(umemp => {
        console.log("umemp, ", umemp);
        setData(umemp);
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
<BarChart
    width={700}
    height={400}
    data={data}
    margin={{
    top: 20,
    right: 30,
    left: 20,
    bottom: 5
    }}
>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="city" />
    <YAxis yAxisId="left" orientation="left" stroke="#FFC658" />
    <Tooltip />
    <Legend />
    <Bar yAxisId="left" dataKey="unemp_rt" fill="#FFC658" />
</BarChart>
);
}

export default Unemployment;