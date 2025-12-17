import { gsap } from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import './index.scss'

const Index = () => {
  const rectRef = useRef(null)
  const wrapperRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const rect = rectRef.current

    // 创建一个无限旋转动画
    gsap.to(rect, {
      rotationX: '+=360',
      rotationY: '+=360',
      duration: 10,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  const randomColor = () => {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    )
  }

  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger)

    let wrapper = document.querySelector('.Horizontal')
    let text = document.querySelector('.Horizontal__text')
    let split = SplitText.create('.Horizontal__text', { type: 'chars, words' })

    const scrollTween = gsap.to(text, {
      xPercent: -100,
      ease: 'none',
      duration: 40,
      repeat: -1,
    })

    split.chars.forEach(char => {
      const color = randomColor()
      char.style.color = color
      gsap.from(char, {
        rotationX: 'random(-180, 180)',
        rotationY: 'random(-180, 180)',
        yPercent: 'random(-80, 80)',
        rotation: 'random(-20, 20)',
        ease: 'none',
        scrollTrigger: {
          trigger: char,
          containerAnimation: scrollTween,
          start: 'left 80%',
          end: 'left 0%',
          scrub: 1,
        },
      })
    })

    // 清理函数
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <div className="main-container">
        {/* <div className="rect" ref={rectRef}>
          <div className="surf surf_1"></div>
          <div className="surf surf_2"></div>
          <div className="surf surf_3"></div>
          <div className="surf surf_4"></div>
          <div className="surf surf_5"></div>
          <div className="surf surf_6"></div>
        </div> */}

        <div className="Horizontal" ref={wrapperRef}>
          <div className="container">
            <h1 className="Horizontal__text heading-xl" ref={textRef}>
              The containerAnimation property allows us to create
              ScrollTriggered animations within a container that's animated
              horizontally. It's like having nested ScrollTriggers!
            </h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
