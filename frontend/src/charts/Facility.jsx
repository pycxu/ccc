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
import { getFacility } from "../utils/helper";

const Facility = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
       await getFacility().then(facility => {
        console.log("facility, ", facility);
        setData(facility);
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
    <YAxis yAxisId="left" orientation="left" stroke="#81CA9C" />
    <Tooltip />
    <Legend />
    <Bar yAxisId="left" dataKey="facility_num" fill="#81CA9C" />
</BarChart>
);
}

export default Facility;