// the format of the function will be as follows.
// <Carousel noOfSlides="type number" slidesObject="type array of objects, containing image url, heading, paragraph caption" />

import React, { useState, useEffect, useRef } from 'react'
import './carousel.css'

const Carousel = ({ noOfSlides:n, slidesObject:obj, width:w, height:h }) => {
    n = parseInt(n)
    const [active, setActive ] = useState(0)
    const [previousActive, setPreviousActive] = useState(0)
    const innerRef = useRef()
    
    const CarouselInner = props => {
        useEffect(() => {
            innerRef.current.style.transform = `translateX(-${props.activeChild*100}%)`
        })
        
        const temp = obj.map( (e, index) => {
            return (
                <div className="carousel__inner-item" id={index}>
                    <div className="carousel__inner-item--content">
                        <img src={e.imageUrl} alt={e.imageAlt} />
                    </div>
                    <div className="carousel__inner-item--heading">
                        <h3>{e.carouselHeading}</h3>
                    </div>
                    <div className="carousel__inner-item--description">
                        <p>{e.carouselDescription}</p>
                    </div>
                </div>
            )
        })

        return (
            <div className="carousel__inner--wrapper">
                <div className="carousel__inner" style={{transform: `translateX(-${previousActive*100}%)`}} ref={innerRef}>
                    {temp}
                </div>
            </div>
        )
    }

    const handleClickOfButton = e => {
        if(e.target.id === 'left') {
            setActive( currentActive => {
                setPreviousActive(currentActive)
                return currentActive === 0 ? n-1 : currentActive-1
            })
        } 

        
        if(e.target.id === 'right') {
            setActive( currentActive => {
                setPreviousActive(currentActive)
                return currentActive === n-1 ? 0 : currentActive+1
            })
            
        } 
        
    }   

    const handleClickOfDots = e => {
        const id = parseInt(e.target.id.slice(-1))
        setActive(currentActive => {
            setPreviousActive(currentActive)
            return id
        })
    }
    
    const CarouselIndicatorDots = () => {
        const dots = obj.map( (e,index) => {
            const generatedId = `dot_${index}`
            return (
                <li className={ index===active ? "active-dot" : ""}  id={generatedId} onClick={handleClickOfDots} ></li>
            )
        })
        
        return (
            <div className="carousel__indicator-dots">
                <ul>
                    {dots}
                </ul>
            </div>
        )
    }
    
    return (

        <div className="carousel" style={{width:w, height:h}}>
            <CarouselInner activeChild={active} />
            <button id="left" className="carousel__button--left" onClick={handleClickOfButton}></button>
            <button id="right" className="carousel__button--right" onClick={handleClickOfButton}></button>
            <CarouselIndicatorDots />
        </div>
    )
}

export default Carousel