import React from 'react';
import styled from 'styled-components';
import  './Home.css';

const CountryInfoDiv = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    height:100%;
    overflow:hidden;
    width:400px;
    left:40%;
    @media (max-width:940px){
        left:35%;
        width:200px;
    }
    @media (max-width:768px){
        left:30%;
        width:180px;
    }
    @media (max-width:650px){
        left:20%;
    }
    @media (max-width:480px){
        left:10%;
        width:180px;
    }
`

const InfoElement = styled.div`
    width:400px;
    position:relative;
    @media (max-width:768px){
        width:200px;
    }
    @media (max-width:480px){
        width:180px;
    }
`

function CountryInfo(props){
    
    const info = props.info;
    let countryObject = [];
    let countryDate = "";
    let splitCountryDate = "";
    
    //Check if the pull is correct
    if(info[props.info.length-1]!= undefined ){
        countryObject = info[info.length-1];
        countryDate = countryObject.Date;
        splitCountryDate = countryDate.split("").splice(0,10).join("");
    }
    
    //If there is no match, return empty
     if(countryObject.length === 0) return(<> </>);

    //Use toLocaleString to add spaces in high-value numbers
    return(
         <CountryInfoDiv>
            <InfoElement>
                <p className="countryName">{countryObject.Country}</p>
                <p>Country</p>
            </InfoElement>
            <InfoElement>
                <p className="stat blue">{countryObject.Confirmed.toLocaleString().replaceAll(","," ")}</p>
                <p>Total cases</p>
            </InfoElement>
            <InfoElement>
                <p className="stat red">{countryObject.Deaths.toLocaleString().replaceAll(","," ")}</p>
                <p>Total deaths</p>
            </InfoElement>
            <InfoElement>
                <p className="stat green">{countryObject.Recovered.toLocaleString().replaceAll(","," ")}</p>
                <p>Total recoveries</p>
            </InfoElement>
            <InfoElement>
                <p className="stat active">{countryObject.Active.toLocaleString().replaceAll(","," ")}</p>
                <p>Active cases</p>
            </InfoElement>
            <InfoElement>
                <p className="date">{splitCountryDate}</p>
                <p>Updated</p>
            </InfoElement>
         </CountryInfoDiv>
    )
}

export default CountryInfo