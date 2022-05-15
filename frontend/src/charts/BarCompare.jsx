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
import { getIncomeWithSocre } from "../utils/helper";

const BarCompare = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const income = await getIncomeWithSocre();
      setData(income);
      console.log("data2, ", income);
    }
    fetchData();
  },[])

  return (
    <BarChart
      width={800}
      height={600}
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
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="sentiment" fill="#8884d8" />
      <Bar yAxisId="right" dataKey="mean_aud" fill="#82ca9d" />
    </BarChart>
  );
}

export default BarCompare;