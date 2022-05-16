import { useState, useEffect } from "react";
import { Chart, Tooltip, Legend, Point, Line, Interval } from "bizcharts";
import { getUnemploymentWithSocre } from "../utils/helper";


const UnemploymentBiaxial = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          let isMounted = true;
          await getUnemploymentWithSocre().then(income => {
            isMounted && setData(income);
            isMounted && setIsLoading(false);
          });
          return () => { isMounted = false }
        }
        fetchData();
    },[])

	let chartIns = null;
    const scale = {
        sentiment: {
            min: 0,
            tickCount: 4,
            alias: 'sentiment',
            type: 'linear-strict'
        },
        unemp_rt: {
            min: 0,
            tickCount: 4,
            alias: 'unemp_rt',
            type: 'linear-strict'
        }
    };
    const colors = ["#FFC658", "#62daaa"];

    if(isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }else {

    return (
        <div id='unemployment' className="unemp">
        <Chart
        scale={scale}
        autoFit
        height={800}
        data={data}
        onGetG2Instance={(chart) => {
            chartIns = chart;
        }}
        >
            <Legend
                custom={true}
                allowAllCanceled={true}
                items={[
                    {
                        value: "unemp_rt",
                        name: "unemp_rt",
                        marker: {
                            symbol: "square",
                            style: { fill: colors[0], r: 5 },
                        },
                    },
                    {
                        value: "sentiment",
                        name: "sentiment",
                        marker: {
                            symbol: "hyphen",
                            style: { stroke: colors[1], r: 5, lineWidth: 3 },
                        },
                    },
                ]}
                onChange={(ev) => {
                    const item = ev.item;
                    const value = item.value;
                    const checked = !item.unchecked;
                    const geoms = chartIns.geometries;

                    for (let i = 0; i < geoms.length; i++) {
                        const geom = geoms[i];

                        if (geom.getYScale().field === value) {
                            if (checked) {
                                geom.show();
                            } else {
                                geom.hide();
                            }
                        }
                    }
                }}
            />
            <Tooltip shared />
            <Interval position="city*unemp_rt" color={colors[0]} />
            <Line
                position="city*sentiment"
                color={colors[1]}
                size={3}
                shape="smooth"
            />
            <Point
                position="city*sentiment"
                color={colors[1]}
                size={3}
                shape="circle"
            />
        
        </Chart>
        </div>

    );
            }
}

export default UnemploymentBiaxial;