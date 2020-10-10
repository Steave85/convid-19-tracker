import React, { useState, useEffect } from 'react';
import numeral from "numeral";
import { Line } from 'react-chartjs-2';
import '../styles/LineGraph.css'

function LineGraph({caseType,countryCode}) {
  const [data, setData] = useState([]);
  const [class_name, setClassName] = useState(cases_class);
  
  useEffect(() => {
       let URL = `https://disease.sh/v3/covid-19/historical/${(countryCode==='')?'all':countryCode}?lastdays=120`;
       (async function (){
            setData( await fetch(URL)
                    .then((response) => response.json())
                    .then(data => {
                      const chartData = [];
                      let dates = [];
                      if(data.cases || data.timeline){
                        dates = (countryCode==='')?new Map(Object.entries(data[caseType])):new Map(Object.entries(data["timeline"][caseType]));
                        dates && dates.forEach((value, key)=>{
                            const newDataPoint = {
                                x: key,
                                y: value
                            }
                             chartData.push(newDataPoint);
                        })
                      }
                    return chartData;
                }));
            })();
            (setClassName((caseType==='cases')? (cases_class) : (caseType==='recovered' ? recoverd_class : death_class)))
        }
    , [caseType,countryCode]);
    return (
        <div>
            <Line className='lineGraph' data= {
                {
                    datasets: [{
                        data: data,
                        borderColor: class_name.borderColor,
                        backgroundColor: class_name.backgroundColor
                    }]
                }
            } options={options}/>
        </div>
    )
}

const recoverd_class = {
  borderColor: 'green',
  backgroundColor:'#7dd71d'
}

const cases_class = {
  borderColor: 'red',
  backgroundColor:'#CC1034'      
}

const death_class = {
  borderColor: 'orange',
  backgroundColor:'#ffc250'      
}


const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            parser: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

export default LineGraph
