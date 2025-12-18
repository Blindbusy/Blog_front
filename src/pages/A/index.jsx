import { gsap } from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import './index.scss'

const A = () => {
  const size = useRef([3, 9, 2, 6, 1.5, 5, 2, 14, 3, 10, 4, 2, 11])
  useEffect(()=>{
    gsap.registerPlugin(SplitText, ScrollTrigger)
    const container = document.querySelector('.container')
    const items = document.querySelectorAll('.item')
    
    items.forEach((item,index) => {
      const split = SplitText.create(item, { type: 'chars' })
      const color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
      split.chars.forEach(char => {
        char.style.color = color
        char.style.fontSize = `${size.current[index]}rem`
        char.style.lineHeight = `${size.current[index]}rem`
        gsap.from(char, {
          xPercent: 'random(-2000, 2000)',
          yPercent: 'random(-800, 800)',
          rotation: 'random(-180, 180)',
          rotationX: 'random(-180, 180)',
          rotationY: 'random(-180, 180)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.bg',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          }
        })
      })
    })
  },[])

  return (
    <>
      <div className="bg">
        <div className="container">
          <div className="item">Hello</div>
          <div className="item">你好</div>
          <div className="item">Ciao</div>
          <div className="item">Bonjour</div>
          <div className="item">こんにちは</div>
          <div className="item">안녕하세요</div>
          <div className="item">Guten Tag</div>
          <div className="item">Hola</div>
          <div className="item">สวัสดี</div>
          <div className="item">Olá</div>
          <div className="item">Привет</div>
          <div className="item">Hej</div>
          <div className="item">Cześć</div>
        </div>
      </div>
    </>
  )
}

export default A