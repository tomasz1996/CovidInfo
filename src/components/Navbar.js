import React, { useState }from 'react';
import virusLogo from '../images/virus_img.png';
import styled, { keyframes } from 'styled-components';
import  './Navbar.css';
import { Link } from 'react-router-dom'

function Navbar(){

    const [isOpen, setIsOpen] = useState(false)
    // Disallow animation to fire on onload.
    const [clicked, setClicked] = useState(false)

    const Hamburger = styled.div`
        flex-direction: column;
        cursor: pointer;
        align-self: center;
        padding: 10px;
        display:none;

        &:active{
            transform:scale(0.95);
        }

        span {
            background-color: black;
            width: 25px;
            height: 4px;
            margin: 3px;
            border-radius:5px;
        }

        @media(max-width:768px){
            display:flex;
        }
    `

    const NavWrapper = styled.div`
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        position:fixed;
        top:0;
        left:0;
        right:0;
        z-index:999;
    `

    const Logo = styled.div`
        display:flex;
    `

    const Name = styled.h1`
        align-self: center;
        color: red;
        text-shadow: 0px 1px 3px rgba(0,0,0,0.5);
        font-family: 'Syne Mono', monospace;
        @media(max-width:280px){
            font-size: 20px;
        }
    `

    const Img = styled.img`
        padding: 0.5rem;
        width: 60px;
        height: 60px;
        @media(max-width:280px){
            position:relative;
            top:6px;    
            width: 40px;
            height: 40px;
        }
    `
    const SlideIn = keyframes`
        from {left: 100%}
        to {left: 0%}
    `
    const SlideOut = keyframes`
        from {left: 0%}
        to {left: 100%}
    `

    const MenuBar = styled.nav`
        font-family: "Lato", sans-serif, monospace;
        display:flex;
        justify-content: space-between;
        align-items: center;
        z-index:9999;

        @media(max-width:768px){
            flex-direction:column;
            position:fixed;
            top:65px;
            width:100%;
            align-content:center;
            background-color: rgba(0,0,0,0.85);
            border-radius: 10px 0 0 10px;
            margin: 0 0 0 20%;
            padding: 15px 0;
            left:100%;
            animation: ${clicked? (isOpen? SlideIn : SlideOut): ''};
            animation-duration:0.5s;
            animation-fill-mode:forwards;
            
        }
    `

    const NavLink = styled(Link)`
        padding:4px;
        text-decoration: none;
        cursor:pointer;
        font-size: 20px;
        color: #1f1f1f;
        margin-right: 45px;
        outline:none;
        transition: all 0.2s ease-in-out; 

        &:hover {
            color:#696969;
        }

        @media(max-width:768px){
            margin: 0 0 0 -20%;
            text-align: center;
            padding: 15px 0;
            color: white;
        }
    `
        
    function moveMenu(){
            setIsOpen(!isOpen); 
            setClicked(true)
        }
    
    return(
        <NavWrapper className="navBackground">
            <Logo>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap" rel="stylesheet"/> 
                <Img src={virusLogo} alt="virus" />
                <Name className="title">CovidInfo</Name>
            </Logo> 
            <Hamburger onClick = {moveMenu}>
                <span></span>
                <span></span>
                <span></span>
            </Hamburger>
            <MenuBar isOpen={isOpen}>
                <NavLink to="/" onClick = {moveMenu}>Home
                </NavLink>
                <NavLink to="/map" onClick = {moveMenu}>Map
                </NavLink>
                <NavLink to="/stats" onClick = {moveMenu}>Stats
                </NavLink>
                <NavLink to="/info" onClick = {moveMenu}>Info
                </NavLink>
            </MenuBar>
        </NavWrapper>
    )
}

export default Navbar;
