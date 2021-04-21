import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
    const daysInChart = props.daysInChart;
    
    const array = props.array;
    const title = props.title;
    const color = props.color;
    const hover = props.hover;

    const formatDate = (d) => {
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return(`${da}.${mo}.${ye}`);
    }

    // finish at yesterday's day by adding 1 to numbers
    const lastDays = (daysInChart) => {

        let number = 31;
        if(daysInChart.ninety === true) number = 91
        else if(daysInChart.oneEighty === true) number = 181
        else if(daysInChart.threeSixty === true) number = 361

        let result = [];
        for(let i = 1; i < number; i++){
            let d = new Date();
            d.setDate(d.getDate() - i);
            result.unshift(formatDate(d));
        }
        return result;
    }

    return ( 
        <div>
            <Bar
                data = {{
                    labels: lastDays(daysInChart),
                    datasets:[
                        {
                            label: title,
                            data: array,
                            backgroundColor: color,
                            borderWidth: 1,
                            hoverBackgroundColor: hover,
                        },
                    ],
                }}
                options = {{
                    responsive: true,
                    maintainAspectRatio: false,
                    legend:{
                        display:true,
                        labels:{
                            fontSize: 18,
                            fontColor: 'black',
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontSize: 14,
                                fontColor: 'black',
                            },
                            gridLines : {
                                color: "rgba(0,0,0,0.3)",
                                display:true,
                                drawBorder: true,
                            }
                            
                        }],
                        yAxes: [{
                            ticks: {
                                fontSize:14,
                                fontColor: 'black',
                                beginAtZero: true,
                            },
                            gridLines : {
                                color: "rgba(0,0,0,0.3)",
                                display:true,
                                drawBorder: true,
                                lineWidth: 1,
                            }
                        }]
                    }
                }}
                height = {400}
                width = {600}
            />
        </div>
     );
}
 
export default BarChart;