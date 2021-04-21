import React from 'react';
import styled from 'styled-components';
import SearchBar from "../components/SearchBar"

const IntroInfo = styled.p` 
    text-align:center;
    margin:75px 15px 15px;
    @media (max-width:480px){
        font-size:0.8rem;
    }
`
const Home = () => {
    return ( 
        <div> 
            <IntroInfo>Get the latest information from the world on the <b>COVID-19</b> pandemic.<br/> Check the latest statistics by entering the country name or selecting it from the list below. </IntroInfo>
            <SearchBar />
        </div>
     );
}
 
export default Home;