import React, { useState , useEffect } from 'react';
import styled from 'styled-components';
import BarChart from '../components/BarChart';
import Dropdown from '../components/Dropdown';
import Loader2 from '../components/Loader2';

const IntroInfo = styled.p` 
    text-align:center;
    margin:5px;
    @media (max-width:480px){
        font-size:0.8rem;
    }
`
const ErrorDiv = styled.div`
    height:22px;
    user-select:none;
`

const ErrorMessage = styled.p`
    display:block;
    color:red;
    text-align:center;
    @media (max-width:480px){
        font-size:0.8rem;
    }
`

const StatsWrapper = styled.div`
    position:relative;
    top: 60px;
    width:90vw;
    height:100%;
    margin:0 auto 80px auto;
    @media (max-width: 468px){
        width:98vw;
    }
`

const ChartWrapper = styled.div`
    position: relative;
    margin: 10px 0 20px 0;
    border-radius: 10px;
    padding: 0px 10px;
    background: rgba(255,255,255,0.5);
    @media (max-width: 468px){
        padding: 0px ;
    }
`


const Stats = () => {

    const [dailyStats, setDailyStats] = useState({
        Confirmed: [],
        Deaths: [],
        Recovered: [],
    });
    const [showUnavailable, setShowUnavailable] = useState(false);
    const [currentVal, setCurrentVal] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [daysInChart, setDaysInChart] = useState({
        thirty: true,
        ninety: false,
        oneEighty: false,
        threeSixty: false,
    })

    //Function called by buttons in Dropdown comp. 
    const setDays = (days) => {
        if(days == 30 ){
            setDaysInChart({
                thirty: true,
                ninety: false,
                oneEighty: false,
                threeSixty: false,     
            })
        }else if(days == 90){
            setDaysInChart({
                thirty: false,
                ninety: true,
                oneEighty: false,
                threeSixty: false,     
            })
        }else if(days == 180){
            setDaysInChart({
                thirty: false,
                ninety: false,
                oneEighty: true,
                threeSixty: false,     
            })
        }else if(days == 360){
            setDaysInChart({
                thirty: false,
                ninety: false,
                oneEighty: false,
                threeSixty: true,     
            })
        }
    }

    // "refresh" chart when setDays -> currentVal changes
    useEffect(()=>{
            if(currentVal != "")
            fetchCountry(currentVal)
    },[daysInChart])


    let totalConfirmed = [];
    let totalDeaths = [];
    let totalRecovered = [];

    let dailyConfirmed = [];
    let dailyDeaths = [];
    let dailyRecovered = [];

    //Endpoint returns only total values. Calculated daily cases
    const totalToDaily = () => {
        for(let j = 0; j < totalRecovered.length -1; j++){
            dailyConfirmed.push(totalConfirmed[j+1]- totalConfirmed[j]);
            dailyDeaths.push(totalDeaths[j+1]- totalDeaths[j]);
            dailyRecovered.push(totalRecovered[j+1]- totalRecovered[j]);
        }
        setDailyStats({
            Confirmed: dailyConfirmed,
            Deaths: dailyDeaths,
            Recovered: dailyRecovered,
        })
    }
   
    const fetchCountry = (element) => {
        // Hide error message and display horizontal loader2
        setShowUnavailable(false)
        setIsLoading(true);
        fetch(`https://api.covid19api.com/total/dayone/country/${element}`)
        .then(res => {return res.json()})
        .then(result => {
            if(result.length === 0){
                console.log("WRONG");
                setIsLoading(false);
                setShowUnavailable(true)
            }else{
                // finish at yesterday's day by adding 1 to numbers
                setIsLoading(false);

                let number = 31;
                if(daysInChart.ninety === true) number = 91
                else if(daysInChart.oneEighty === true) number = 181
                else if(daysInChart.threeSixty === true) number = 361
                
                for(let i = result.length-number; i < result.length; i++){
                    totalConfirmed.push(result[i].Confirmed);
                    totalDeaths.push(result[i].Deaths);
                    totalRecovered.push(result[i].Recovered);
                    if(i == result.length - 1){
                        totalToDaily();
                    }
                }
                setShowUnavailable(false)
            }
        })
        .catch(error => console.log('Error: ', error));
        }

    return ( 
        <StatsWrapper>
            <IntroInfo>Get informed with daily informations from any country around the world.
                <br/>Choose any country from the list below and from how early the data you would like to see.
            </IntroInfo>
            <Dropdown
            setIsLoading = {setIsLoading}
            setDays = {setDays} 
            setCurrentVal = {setCurrentVal}
            fetchCountry = {fetchCountry}/>
             
            <ErrorDiv>
                {isLoading && <Loader2 />}
                {showUnavailable && <ErrorMessage>We are sorry, but the data for this country is temporarily unavailable.</ErrorMessage>}
            </ErrorDiv>
            <ChartWrapper>
                <BarChart 
                array = {dailyStats.Confirmed} 
                title = "Confirmed" 
                color = "deepskyblue" 
                hover = "rgb(117, 227, 255)" 
                daysInChart = {daysInChart}/> 
            </ChartWrapper>
            <ChartWrapper>
                <BarChart 
                array = {dailyStats.Deaths} 
                title = "Deaths" 
                color = "rgb(46, 46, 46)" 
                hover = "rgb(105, 105, 105)" 
                daysInChart = {daysInChart}/>
            </ChartWrapper>
            <ChartWrapper>
                <BarChart 
                array = {dailyStats.Recovered} 
                title = "Recovered" 
                color = "rgb(29, 176, 0)" 
                hover = "rgb(78, 199, 94)" 
                daysInChart = {daysInChart}/>
            </ChartWrapper>
        </StatsWrapper>
     );
}
 
export default Stats;