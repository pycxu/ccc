import { useEffect, useState } from "react";
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
      let isMounted = true;
       await getFacility().then(facility => {
        console.log("facility, ", facility);
        isMounted && setData(facility);
        isMounted && setIsLoading(false);
       });
       return () => { isMounted = false }
    }
    fetchData();
  },[])

  if(isLoading) {
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
    }
return (
<BarChart
    width={600}
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
    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
    <Tooltip />
    <Legend />
    <Bar yAxisId="left" dataKey="facility_num" fill="#8884d8" />
</BarChart>
);
}

export default Facility;