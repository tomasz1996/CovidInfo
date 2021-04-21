import React, { useState } from 'react';
import wear_mask from '../images/wear_mask.png';
import vaccine from '../images/vaccine.png';
import distance from '../images/distance.png';
import stay_home from '../images/stay_home.png';
import correct_mask from '../images/correct_mask.png';
import styled from 'styled-components';
import Slider from 'react-slick';
import  './Home.css';
import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi';

const CarouselImg = styled.img`
    width:250px;
    margin:0 auto;
    @media (max-width:1050px){
        width:200px;
    }
    @media (max-width:768px){
        width:150px;
    }
`

const CarouselDiv = styled.div`
    width:50%;
    margin:70px auto 10px auto;
    @media (max-width:1600px){
        width:60%;
    }
    @media (max-width:1250px){
        width:70%;
    }
    @media (max-width:940px){
        width:80%;
    }
    @media (max-width:768px){
        width:90%;
    }
`
const ImgDiv = styled.div`
    transition: transform 300ms;

    ${props =>props.index === props.imageIndex ? {opacity: 1,  transform:'scale(1)'} : {opacity: 0.3,  transform:'scale(0.4)', position:'relative', zIndex: -1 }}
`

const RightArrow = styled.div`
    cursor:pointer;
    z-index: 10;
    font-size: 1.8rem;
    position:absolute;
    right: 0%;
    top:40%;
`
const LeftArrow = styled.div`
    cursor:pointer;
    z-index: 10;
    font-size: 1.8rem;
    position:absolute;
    left: 0%;
    top:40%;
`

const Carousel = () => {
    const slides = [wear_mask, vaccine, distance, stay_home, correct_mask]

    const [imageIndex, setImageIndex] = useState(0);
    const NextArrow = ({onClick}) =>{
        return(
        <RightArrow onClick={onClick}>
            <HiChevronDoubleRight/>
        </RightArrow>)
    }

    const PrevArrow = ({onClick}) =>{
        return(
        <LeftArrow onClick={onClick}>
            <HiChevronDoubleLeft/>
        </LeftArrow>)
    }

    
    const settings = {
        dots: true,
        infinite: true,
        lazyLoad: true,
        speed: 300,
        slidesToShow: 3,
        centerMode: true,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:1800,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        beforeChange: (current, next) => setImageIndex(next),
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
      };
    return (
        <CarouselDiv>
            <Slider {...settings}>
                 {slides.map((item, index)=>(
                 <ImgDiv index={index} imageIndex={imageIndex} key={index}>
                     <CarouselImg src = {item} alt={item} key={index}/>
                </ImgDiv>))}
            </Slider>
        </CarouselDiv>
      );
}
 
export default Carousel;