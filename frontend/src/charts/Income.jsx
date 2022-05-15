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
import { getIncome } from "../utils/helper";

const Income = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
       await getIncome().then(income => {
        console.log("income, ", income);
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
    <XAxis dataKey="lga_name16" />
    <YAxis yAxisId="left" orientation="left" stroke="#6B99F9" />
    <Tooltip />
    <Legend />
    <Bar yAxisId="left" dataKey="mean_aud" fill="#6B99F9" />
</BarChart>
);
}

export default Income;