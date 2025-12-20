import { DoubleRightOutlined } from '@ant-design/icons'
import { gsap } from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import './index.scss'

const A = () => {
  const words = useRef([
    'Hola',
    '你好',
    'Ciao',
    'Bonjour',
    'こんにちは',
    '안녕하세요',
    'Guten Tag',
    'Hello',
    'สวัสดี',
    'Olá',
    'Привет',
    'Hej',
    'Selam',
  ])
  const size = useRef([3, 9, 2.5, 6, 3, 5, 2.5, 14, 3, 10, 4, 3, 10])
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
  const introBgDecorations = useRef([
    'rgba(0, 195, 255, 1)',
    'rgba(255, 56, 56, 1)',
    'rgba(65, 218, 0, 1)',
  ])

  // top-container内部动画（字符、下箭头、圆形过渡、logo移动）
  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger)
    const items = document.querySelectorAll('.item')

    // 拆分每个item的字符，为每个字符添加动画
    items.forEach((item, index) => {
      const split = SplitText.create(item, { type: 'chars' })
      const fontSize = `${size.current[index]}rem`
      const color = charColor.current[index]
      split.chars.forEach(char => {
        char.style.color = color
        char.style.fontSize = fontSize
        char.style.lineHeight = fontSize
        gsap.from(char, {
          opacity: 0.7,
          xPercent: 'random(-500, 500)',
          yPercent: 'random(-300, 300)',
          rotation: 'random(-180, 180)',
          rotationX: 'random(-180, 180)',
          rotationY: 'random(-180, 180)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.top-container',
            start: 'top 0',
            end: '+=200vh',
            scrub: 1.5,
            invalidateOnRefresh: true,
            // once: true,
          },
        })
      })
    })

    // logo动画
    const logoBG = document.querySelector('.nav-logo-bg')
    // 计算屏幕中心位置
    const screenCenterX = window.innerWidth / 2
    const screenCenterY = window.innerHeight / 2

    // 使用GSAP的transformOrigin来确保缩放时以中心点进行缩放
    gsap.set(logoBG, {
      scale: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      xPercent: -50,
      yPercent: -50,
      x: screenCenterX,
      y: screenCenterY,
      transformOrigin: 'center center',
    })
    // 创建从中心到左上角的动画
    gsap.to(logoBG, {
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '.top-container',
        start: 'top 0',
        end: '+=200vh',
        scrub: 2,
        invalidateOnRefresh: true,
      },
    })

    // 下箭头动画
    const downArrow = document.querySelector('.down-arrow')
    // 箭头从屏幕上方移动到下方的动画
    gsap.fromTo(
      downArrow,
      {
        yPercent: -100, // 初始位置：屏幕上方（隐藏）
        opacity: 1,
      },
      {
        yPercent: -10, // 结束位置：原始位置
        opacity: 0,
        scrollTrigger: {
          trigger: '.top-container',
          start: 'top top',
          end: '+=1200vh',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    )
    // 添加闪烁动画
    gsap.to(downArrow, {
      y: 12, // 下移距离
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'sine.inOut',
    })

    // top-container 圆形过渡动画
    const topContainer = document.querySelector('.top-container')
    gsap.to(topContainer, {
      borderRadius: '0 0 50% 50%',
      scrollTrigger: {
        trigger: '.top-container',
        start: '+=150vh',
        end: '+=350vh',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    const nav = document.querySelector('.nav')
    // 创建一个滚动触发器，固定 top-container 元素
    const topContainerTrigger = ScrollTrigger.create({
      trigger: '.top-container',
      start: 'top 0',
      end: '+=350vh', // 增加滚动距离以适应动画
      pin: '.top-container', // 明确指定要固定的元素
      pinSpacing: true, // 保持占位空间
      anticipatePin: true, // 预测pin状态以减少白边
      invalidateOnRefresh: true, // 在窗口大小调整时重新计算
      onEnter: () => {
        nav.style.backdropFilter = 'none'
      },
      onLeave: () => {
        nav.style.backdropFilter = 'blur(10px)'
      },
      onEnterBack: () => {
        nav.style.backdropFilter = 'none'
      },
      onLeaveBack: () => {
        nav.style.backdropFilter = 'none'
      },
    })

    return () => {
      // 销毁所有字符滚动触发器
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      topContainerTrigger.kill() // 销毁 top-container 触发器
      gsap.killTweensOf(logoBG) // 销毁 logo 动画
      gsap.killTweensOf(downArrow) // 销毁下箭头动画
      gsap.killTweensOf(topContainer) // 销毁 top-container 动画
      items.forEach(item => {
        gsap.killTweensOf(item) // 销毁字符动画
      })
    }
  }, [])

  // intro部分动画
  useEffect(() => {
    const introContainer = document.querySelector('.intro-container')
    const introTitleContainer = document.querySelector('.intro-title-container')
    const introTitle = document.querySelector('.intro-title')
    const titleChars = SplitText.create(introTitle, { type: 'chars' })
    titleChars.chars.forEach((char, index) => {
      gsap.set(char, { y: index % 2 === 0 ? 5 : -5 })
      gsap.to(char, {
        y: 0,
        duration: 0.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    })
    const titleAnim = gsap.fromTo(
      introTitleContainer,
      { x: -introContainer.offsetWidth },
      {
        x: 100,
        scrollTrigger: {
          trigger: introContainer,
          start: 'top 50%',
          end: '+=120vh',
          scrub: 2,
          invalidateOnRefresh: true,
        },
      }
    )
    const dots = document.querySelectorAll('.intro-bg-decoration')
    dots.forEach((dot, index) => {
      let scrub = 2
      if (index == 0) scrub = 4
      else if (index == 1) scrub = 3

      gsap.fromTo(
        dot,
        { y: '-300vh' },
        {
          y: 0,
          scrollTrigger: {
            trigger: introContainer,
            start: 'top 10%',
            end: '+=120vh',
            scrub: scrub,
            invalidateOnRefresh: true,
          },
        }
      )
    })

    ScrollTrigger.create({
      trigger: introContainer,
      start: 'top 80px',
      end: '+=350vh',
      pin: introContainer,
      scrub: 1,
      pinSpacing: true, // 保持占位空间
      anticipatePin: true, // 预测pin状态以减少白边
      invalidateOnRefresh: true, // 在窗口大小调整时重新计算
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      titleAnim.kill()
    }
  }, [])

  return (
    <>
      <div className="main-container">
        {/* 顶部导航栏 */}
        <section className="nav">
          <div className="nav-logo-bg">
            <img src="/logo.svg" alt="Logo" className="nav-logo" />
          </div>
        </section>
        {/* 开屏字符动画 */}
        <section className="top-container">
          <div className="char-container">
            {words.current.map((item, index) => (
              <div className="item" key={index}>
                {item}
              </div>
            ))}
          </div>
          <DoubleRightOutlined className="down-arrow" />
        </section>
        {/* intro部分 */}
        <section className="intro-container">
          <div className="intro-bg-decoration-container">
            {introBgDecorations.current.map((item, index) => (
              <div
                className="intro-bg-decoration"
                key={index}
                style={{ backgroundColor: item }}
              ></div>
            ))}
          </div>
          <div className="intro-title-container">
            <span className="intro-title">This is me</span>
          </div>
        </section>
      </div>
    </>
  )
}

export default A
