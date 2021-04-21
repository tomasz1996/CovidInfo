import React from 'react';
import styled from 'styled-components';
import  './Informations.css';

const MainContent = styled.div`
    width:100%;
    margin-top:50px;
`

const InfoWrapper = styled.div`
    position:relative;
    left:50%;
    transform: translateX(-50%);
    max-width: 900px;
    margin:0 40px 20px 0 ;
    padding:30px;
    background: rgba(0,0,0,0.1);
    text-align:justify;
    border-radius: 15px;
    @media (max-width:480px){
        padding:15px;
        margin:0 10px 20px 0 ;
        fontSize:0.8rem;
    }
`
//Styles for inline styling
let sectionStyles = {
        width: '70%',
        fontSize:'1.1rem',
        margin:'0 auto',
        fontWeight:'700'
}
const Informations = () => {

    

    return ( 
        <MainContent>
            <InfoWrapper>
                <p><b>COVID-19</b> is the disease caused by a new coronavirus called SARS-CoV-2.  WHO first learned of this new virus on 31 December 2019, following a report of a cluster of cases of ‘viral pneumonia’ in Wuhan, People’s Republic of China.</p><br/>
                <p>The most common symptoms of COVID-19 are:</p>

                <ul style = {{margin:'10px 0 10px 40px'}}>
                    <li>Fever</li>
                    <li>Dry cough</li>
                    <li>Fatigue</li>
                </ul>
                
                <p>Other symptoms that are less common and may affect some patients include:</p>

                <ul style = {{margin:'10px 0 10px 40px'}}>
                    <li>Loss of taste or smell</li>
                    <li>Nasal congestion</li>
                    <li>Sore throat</li>
                    <li>Conjunctivitis (also known as red eyes)</li>
                    <li>Muscle or joint pain</li>
                    <li>Nausea or vomiting</li>
                    <li>Chills or dizziness</li>
                    <li>High temperature (above 38 °C)</li>
                </ul>

                <p>People of all ages who experience fever and/or cough associated with difficulty breathing or shortness of breath, chest pain or pressure, or loss of speech or movement should seek medical care immediately. If possible, call your health care provider, hotline or health facility first, so you can be directed to the right clinic.</p><br />

                <p>Anyone with symptoms should be tested, wherever possible. People who do not have symptoms but have had close contact with someone who is, or may be, infected may also consider testing – contact your local health guidelines and follow their guidance.<br/><br/></p>

                <p>While a person is waiting for test results, they should remain isolated from others. Where testing capacity is limited, tests should first be done for those at higher risk of infection, such as health workers, and those at higher risk of severe illness such as older people, especially those living in seniors’ residences or long-term care facilities.<br/><br/></p>

                <div style = {sectionStyles}>Stay safe by taking some simple precautions, such as: physical distancing, wearing a mask, especially when distancing cannot be maintained, keeping rooms well ventilated, avoiding crowds and close contact, regularly cleaning your hands, and coughing into a bent elbow or tissue.</div><br/>
                
                <p>Check local advice where you live and work. Do it all!</p><br/>

                <p><b>If you have any symptoms</b> suggestive of COVID-19, call your health care provider or COVID-19 hotline for instructions and find out when and where to get a test, stay at home for 14 days away from others and monitor your health.<br/><br/></p>

                <p>If you have shortness of breath or pain or pressure in the chest, seek medical attention at a health facility immediately. Call your health care provider or hotline in advance for direction to the right health facility.<br/><br/></p>

                <p>If you live in an area with malaria or dengue fever, seek medical care if you have a fever.<br/><br/></p>

                <p>If local guidance recommends visiting a medical centre for testing, assessment or isolation, wear a medical mask while travelling to and from the facility and during medical care. Also keep at least a 1-metre distance from other people and avoid touching surfaces with your hands.  This applies to adults and children.</p><br/><br/>

                <p>For more infomations visit official <a href="https://www.who.int" className="WHO" target="_blank">World Health Organization</a> website.</p>
            </InfoWrapper>
        </MainContent>
     );
}
 
export default Informations;