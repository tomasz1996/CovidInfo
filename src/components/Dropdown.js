import React, { useState , useEffect} from 'react';
import styled from 'styled-components';
import  '../styles.css';

const StickyDiv = styled.div`
    position:sticky;
    max-width:680px;
    margin:0 auto;
    display:flex;
    flex-direction: row;
    top:60px;
    z-index:10;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const Select = styled.select`
    position:relative;
    min-width:200px;
    max-width: 400px;
    height: 35px;
    border: 1 px solid black;
    background: #333333;
    color: white;
    font-size: 16px;
    border: none;
    border-radius:5px;
    cursor:pointer;
    outline:none;

    @media (max-width: 768px) {
        left:50%;   
        transform: translateX(-50%);
    }
    @media(max-width:440px){
        width: 317px;
    }
    @media(max-width:335px){
        width: 220px;
        font-size: 14px;
    }

    option {
    color: #1f1f1f;
    }
`

const ButtonDiv = styled.div`
    white-space: no-wrap;
    margin-left: 5px;
    @media (max-width: 768px) {
        margin: 7px auto 4px auto;
    }
`

const Button = styled.button`
    position:relative;
    top:50%;
    transform:translateY(-50%);
    display: inline-block;
    cursor:pointer;
    outline: none;
    font-size: 16px;
    padding: 5px;
    margin:0 5px;
    border:none;
    border-radius:3px;
    background:#333333;
    color:white;
    &:hover{
        background:#696969;
    }
    @media (max-width: 768px) {
        top:0%;
        transform:translateY(0%);
    }
    @media(max-width:335px){
        font-size: 14px;
        padding: 3px;
        margin:0 3px;
    }
`

const Dropdown = (props) => {
    const [countriesWithSlugs, setCountriesWithSlugs] = useState([])
    const [currentValue, setCurrentValue] = useState("")

    const url = `https://api.covid19api.com/countries`;

    //Call fetch when currenValue is changed by the buttons. Fetch is also called on onChange in select bar.
    useEffect(()=>{
        if(currentValue != "")
        props.fetchCountry(currentValue)
    },[currentValue])

    //Load list of countries to select bar
    useEffect(()=>{
        props.setIsLoading(true)
        fetch(url)
            .then(res => {
                return res.json();
                })
            .then(result => {
                setCountriesWithSlugs(result.map(obj=> ({country: obj.Country, slug: obj.Slug})));
                props.setIsLoading(false);
            })
            .catch(error => {
                props.setIsLoading(false);
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
        <StickyDiv>
            <Select onChange={(e) => {
                setCurrentValue(e.target.value);
                props.setCurrentVal(currentValue);
            }}>
                    {sortedCountriesWithSlugs.map((obj)=>(
                        <option
                        style = {{color: "white"}}
                        key = {obj.slug} 
                        value = {obj.slug}>{obj.country}</option>))
                    }
            </Select>
            <ButtonDiv>
                <Button onClick = {() => {
                    props.setIsLoading(true)
                    props.setDays(30);
                    props.setCurrentVal(currentValue);
                }}>30 Days</Button>
                <Button onClick = {() => {
                    props.setIsLoading(true)
                    props.setDays(90); 
                    props.setCurrentVal(currentValue);
                }}>90 Days</Button>
                <Button onClick = {() => {
                    props.setIsLoading(true)
                    props.setDays(180);
                    props.setCurrentVal(currentValue);
                }}>180 Days</Button>
                <Button onClick = {() => {
                    props.setIsLoading(true)
                    props.setDays(360);
                    props.setCurrentVal(currentValue);
                    }}>360 Days</Button>
            </ButtonDiv>
        </StickyDiv> 
    )
}
export default Dropdown;