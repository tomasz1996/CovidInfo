import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import styled from 'styled-components';
import MapChart from "../components/MapChart";
import Loader from '../components/Loader';
import MapInfo from "../components/MapInfo";

const StatsWrapper = styled.div`
  position:relative;
  display:flex;
  flex-direction:column;
  top: 60px;
  margin: 10px auto;
  max-width:70vw;
  @media(max-width:1100px){
    max-width: 98vw;
    margin: 10px auto;
  }
`
const IntroInfo = styled.p` 
    text-align:center;
    margin:5px 10px 10px 10px;
    @media (max-width:480px){
        font-size:0.8rem;
    }
`

const MapWrapper = styled.div`
  background:rgba(0,0,0,0.3);
  border-radius:20px;
`

const BlankDiv = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    background: rgba(0,0,0,0.1);
    width:100%;
    height:20vh;            
    border-radius: 15px;
    margin: 10px 0px 20px 0;

    @media(max-width:800px){
      height:45vh; 
    }
`

const BlankText = styled.p`
    position:relative;
    text-align: center;
    top:50%;
    font-size: 2.5rem;
    color: rgba(255,255,255,0.7);
    text-shadow: 0px 1px 3px rgba(0,0,0,0.5);
    font-weight: 600;
    user-select:none;
    width:100%;
`

const BlankError = styled.p`
    position:relative;
    text-align: center;
    top:50%;
    font-size: 1.5rem;
    color: rgba(255,50,50);
    text-shadow: 0px 1px 3px rgba(0,0,0,0.5);
    font-weight: 600;
    user-select:none;
    width:100%;
    @media(max-width:800px){
      font-size: 1.3rem;
    }
`

function Map() {

  const [content, setContent] = useState("");
  const [info, setInfo] = useState(null);
  const [lastDay, setLastDay] = useState({
    Confirmed: [],
    Deaths: [],
    Recovered: [],
});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isChooseCountryText, setIsChooseCountryText] = useState(true);


  const fetchCountry = (element) => {
      setError(false);
      setIsChooseCountryText(false);
      const abortCont = new AbortController();
      setIsLoading(true);
      fetch(`https://api.covid19api.com/total/dayone/country/${element}`, {signal: abortCont.signal})
      .then(res => {return res.json()})
      .then(result => {
        
          //Check if response is empty 
          if(result.length === 0){
            console.log("length 0 ")
              setError(true);
              setIsLoading(false);
          }else{
            setInfo(result);
            setLastDay({
              Confirmed: result[result.length - 1].Confirmed- result[result.length - 2].Confirmed,
              Deaths: result[result.length - 1].Deaths - result[result.length - 2].Deaths,
              Recovered: result[result.length - 1].Recovered - result[result.length - 2].Recovered
            })

            setIsChooseCountryText(false);
            setIsLoading(false);
          }
      })
      .catch(error => {
          setInfo(null)
          setError(true);
          setIsLoading(false);
          console.log('Error: ', error);
      });

      return ()=>{abortCont.abort()}
  }
    return (
      <StatsWrapper>
        <IntroInfo>Select any country from the map by zooming in and exploring the furthest corners of the world.
        </IntroInfo>
        <MapWrapper>
            <MapChart fetchCountry = {fetchCountry} setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </MapWrapper>
        <BlankDiv>
          {isChooseCountryText && <BlankText>Choose a country</BlankText>}
          {error && <BlankError>Data for this cuntry is unavailable</BlankError>}
          {isLoading && <Loader />}
          {(info!= null && !isLoading && !isChooseCountryText && !error) && <MapInfo lastDay = {lastDay} info = {info}/>}
        </BlankDiv>
      </StatsWrapper>

    );
  }

export default Map
