import React, { useState } from 'react';
import searchLogo from "../images/search_icon.png"
import styled from 'styled-components';
import CountryInfo from "../components/CountryInfo"
import CountryGrid from "../components/CountryGrid"
import Loader from "../components/Loader"

const InputBar = styled.input`
    max-width:450px;
    width:100%;
    outline: none;
    border: none;
    font-size:20px;
    padding: 10px 10px;
    border-radius:8px;
    background-color:white;
    box-shadow: 0px 3px rgba(0,0,0,0.1);
    &:hover {
        background-color: rgba(255,255,255,0.8)
    }
    @media (max-width:480px){
        padding: 5px;
    }
`
const SearchIcon = styled.img`
    height: 34px;
    width: 34px;
    align-self:center;
    cursor:pointer;
    border-radius: 6px;
    margin-left:8px;
    box-shadow: 0px 3px rgba(0,0,0,0.1);
    &:active{
        transform:scale(0.95);
    }
    @media (max-width:480px){
        height: 25px;
        width: 25px;
    }
`
const SearchDiv = styled.div`
    display:flex;
    justify-content: center;
    margin:0 15px;
`
const ErrorDiv = styled.div`
    margin:10px 0;
    height:22px;
    user-select:none;
    @media (max-width:650px){
        margin:5px 0;
    }
`

const ErrorMessage = styled.p`
    display:block;
    color:red;
    text-align:center;
    @media (max-width:480px){
        font-size:0.8rem;
    }
`
const MainInfoDiv = styled.div`
    display:flex;
    width:80%;
    margin: auto;
    @media (max-width:768px){
        width:98%;
    }
`
const BlankDiv = styled.div`
    position:relative;
    background: rgba(0,0,0,0.1);
    width:100%;
    border-radius: 15px;
    margin: 10px 10px 0 0;
`

const BlankText = styled.p`
    position:relative;
    text-align: center;
    top:55%;
    font-size: 2.5rem;
    color: rgba(255,255,255,0.7);
    text-shadow: 0px 1px 3px rgba(0,0,0,0.5);
    font-weight: 600;
    user-select:none;
    @media (max-width:940px){
        font-size: 2rem;
    }
`

function SearchBar() {
    const [info, setInfo] = useState(null);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showUnavailable, setShowUnavailable] = useState(false);
    const [isChooseCountryText, setIsChooseCountryText] = useState(true);

    const check = (e) => {
        if((e.type === "click" || e.key == "Enter") && query!= "")
        fetchCountry(query);
    }

    
    const fetchCountry = (element) => {
        setShowError(false);
        setShowUnavailable(false);
        const abortCont = new AbortController();
        setIsLoading(true);
        fetch(`https://api.covid19api.com/total/dayone/country/${element}`, {signal: abortCont.signal})
        .then(res => {return res.json()})
        .then(result => {
            setIsChooseCountryText(false);
            setInfo(result);
            setIsLoading(false);
            
            //Check if response is empty 
            if(result.length === 0){
                setIsChooseCountryText(true);
                setShowUnavailable(true);
            }
            //Check if there is an invalid name in input
            if(result.length === undefined){
                setIsChooseCountryText(true);
                setShowError(true);
            }
        })
        .catch(error => {
            setIsLoading(false);
            console.log('Error: ', error);
        });

        return ()=>{abortCont.abort()}
    }
    
    // https://api.covid19api.com/world/total - total on world
    return ( 
        <div>
           <SearchDiv>
                <InputBar
                type="text"
                placeholder="Search country..."
                onKeyPress={check}
                value = {query}
                onChange = {e => {
                    setQuery(e.target.value);
                    setShowError(false);
                    setShowUnavailable(false);
                    }
                }
                />
                <SearchIcon onClick={check} src={searchLogo} alt="search icon"/>
            </SearchDiv> 
            <ErrorDiv>
                {showError && <ErrorMessage>Invalid name, try again...</ErrorMessage>}
                {showUnavailable && <ErrorMessage>We are sorry, but the data for this country is temporarily unavailable.</ErrorMessage>}
            </ErrorDiv>
            <MainInfoDiv>
                <BlankDiv>
                    {isChooseCountryText && <BlankText>Choose a country</BlankText>}
                    {isLoading && <Loader />}
                    {(info!= null && !isLoading && !isChooseCountryText) && <CountryInfo info={info}/>}
                </BlankDiv>
                
                <CountryGrid fetchCountry={fetchCountry}/>
            </MainInfoDiv>
        </div>
        
     );
}
 
export default SearchBar;