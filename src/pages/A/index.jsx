import { gsap } from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import './index.scss'

const A = () => {
  const size = useRef([3, 9, 2.5, 6, 3, 5, 2.5, 14, 3, 10, 4, 3, 11])
  const charColor = useRef([
    '#0178ffff',
    '#ffffffff',
    '#FF7A9C',
    '#9254DE',
    '#85A5FF',
    '#76ed31ff',
    '#FF9A44',
    '#FAAD14',
    '#1fece6ff',
    '#e1919eff',
    '#66BB6A',
    '#384eb8ff',
    '#FF6B6B',
  ])
  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger)
    const container = document.querySelector('.container')
    const items = document.querySelectorAll('.item')

    items.forEach((item, index) => {
      const split = SplitText.create(item, { type: 'chars' })
      split.chars.forEach(char => {
        char.style.color = charColor.current[index]
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
            trigger: '.top-bg',
            start: 'top 60px',
            end: '+=100vh',
            scrub: 1.5,
            once: true,
          },
        })
      })
    })

    const mainTrigger = ScrollTrigger.create({
      trigger: '.top-bg',
      start: 'top 60px',
      end: '+=200vh', // 增加滚动距离以适应动画
      pin: '.top-bg', // 明确指定要固定的元素
      pinSpacing: true, // 保持占位空间
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <div className="main-container">
        <div className="nav"></div>
        <section className="top-bg">
          <div className="container">
            <div className="item">Hola</div>
            <div className="item">你好</div>
            <div className="item">Ciao</div>
            <div className="item">Bonjour</div>
            <div className="item">こんにちは</div>
            <div className="item">안녕하세요</div>
            <div className="item">Guten Tag</div>
            <div className="item">Hello</div>
            <div className="item">สวัสดี</div>
            <div className="item">Olá</div>
            <div className="item">Привет</div>
            <div className="item">Hej</div>
            <div className="item">Cześć</div>
          </div>
        </section>
      </div>
    </>
  )
}

export default A
