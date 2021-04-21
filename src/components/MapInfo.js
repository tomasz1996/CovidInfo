import React from 'react';
import styled from 'styled-components';
import  './MapInfo.css';

const CountryInfoDiv = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
    margin: auto;
    height:100%;
    justify-content: space-around;
    @media(max-width:800px){
        height:45vh; 
        flex-direction:row;
      }
`
const LastDayDiv = styled.div`
    display:flex;
    align-items:center;
    margin:auto;
    @media(max-width:800px){
        display:block;
      }
    @media(max-width:480px){
      }
`
const TotalDiv = styled.div`
    display:flex;
    justify-content: center;
    margin:auto;
    @media(max-width:800px){
        display:block;
        margin-right:50px;
      }
    @media(max-width:480px){
        margin:auto;
        
      }
`

const InfoElement = styled.div`
    position:relative;
    margin:10px;
`


function MapInfo(props){
    
    const info = props.info;
    const lastDay = props.lastDay;
    let countryObject = [];
    if(info[props.info.length-1]!= undefined ){
        countryObject = info[info.length-1];
    }
    console.log("last day in Mapinfo on render");
    console.log(props.lastDay);

    //Use toLocaleString to add spaces in high-value numbers
    return(
         <CountryInfoDiv>
             <TotalDiv>
                <InfoElement>
                    <p className="mapCountryName">{countryObject.Country}</p>
                    <p className="text">Country</p>
                </InfoElement>
                <InfoElement>
                    <p className="mapStat blue">{countryObject.Confirmed.toLocaleString().replaceAll(","," ")}</p>
                    <p className="text">Total cases</p>
                </InfoElement>
                <InfoElement>
                    <p className="mapStat red">{countryObject.Deaths.toLocaleString().replaceAll(","," ")}</p>
                    <p className="text">Total deaths</p>
                </InfoElement>
                <InfoElement>
                    <p className="mapStat green">{countryObject.Recovered.toLocaleString().replaceAll(","," ")}</p>
                    <p className="text">Total recoveries</p>
                </InfoElement>
                <InfoElement>
                    <p className="mapStat active">{countryObject.Active.toLocaleString().replaceAll(","," ")}</p>
                    <p className="text">Active cases</p>
                </InfoElement>
             </TotalDiv>
             <LastDayDiv>
                <InfoElement>
                    <p className = "lastDay">Last Day:</p>
                </InfoElement>
                <InfoElement>
                    <p className="mapStat blue">{lastDay.Confirmed.toLocaleString().replaceAll(","," ")}</p>
                    <p className="text">Cases</p>
                </InfoElement>
                <InfoElement>
                    <p className="mapStat red">{lastDay.Deaths.toLocaleString().replaceAll(","," ")}</p>
                    <p className="text">Deaths</p>
                </InfoElement>
                <InfoElement>
                    <p className="mapStat green">{lastDay.Recovered.toLocaleString().replaceAll(","," ")}</p>
                    <p className="text">Recoveries</p>
                </InfoElement>
             </LastDayDiv>
            
         </CountryInfoDiv>
    )
}

export default MapInfo