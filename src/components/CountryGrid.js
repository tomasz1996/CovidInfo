import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from './Loader'
import  './Home.css';


const ListWrapper = styled.div`
    position: relative;
    max-width:350px;
    min-width: 100px;
    height: 70vh;
    margin: 10px 0 0 0;
    padding:10px 20px;
    background: rgba(0,0,0,0.1);
    border: solid 10px rgba(0,0,0,0.006);
    border-radius: 15px;
    overflow-x: hidden;
    overflow-y: auto;
    @media (max-width:768px){
        padding:10px 10px;
    }
    @media (max-width:480px) or (max-height:800px){
        padding:5px 10px;
        border: solid 5px rgba(0,0,0,0.006);
        height: 65vh;
    }
    @media (max-height:750px){
        height: 60vh;
`

const CountryItem = styled.div`
    text-align:center;
    cursor:pointer;
    padding:6px 0;
    width: 100%;
    font-size:1.1rem;
    margin:7px 0;
    color: #333;
    user-select:none;
    font-weight:500;
    border-radius:4px;
    background: rgba(255,255,255,0.5);
    transition: background 0.2s;
        &:hover{
            background: rgba(255,255,255,0.9);
            transition: all 0.3s ease-in-out;
            font-weight:bolder;
        }
        &:active{
            transform:scale(0.95)
        }
    @media (max-width:768px){
        font-size:1rem;
    }
    @media (max-width:480px){
        font-size:0.9rem;
        margin:5px 0;
    }
`

function CountryGrid(props){

    const [isLoading, setIsLoading] = useState(true)
    const [countriesWithSlugs, setCountriesWithSlugs] = useState([])
    
    const url = `https://api.covid19api.com/countries`;

    useEffect(()=>{
        fetch(url)
            .then(res => {
                return res.json();
                })
            .then(result => {
                setCountriesWithSlugs(result.map(obj=> ({country: obj.Country, slug: obj.Slug})));
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('Error: ', error);
            });
    },[url]);

    //Sort array of objects by the name of the country
    function compare(a,b){
        if(a.country < b.country) return -1
        if(a.country > b.country) return 1
        return 0;
    }
    const sortedCountriesWithSlugs = countriesWithSlugs.sort(compare)

    return ( 
    <ListWrapper>
        {isLoading && <Loader id="gridLoader"/>}
        {sortedCountriesWithSlugs.map((obj)=>(
            <CountryItem key={obj.country} onClick={()=>{props.fetchCountry(obj.slug)}}>
                <p>{obj.country}</p>
            </CountryItem>
        ))}
    </ListWrapper> 
    );
}
 
export default CountryGrid;