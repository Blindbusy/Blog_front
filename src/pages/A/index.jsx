import { DoubleRightOutlined } from '@ant-design/icons'
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

  // top-container上的动画（字符、下箭头、圆形过渡、logo移动）
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
            end: '+=100vh',
            scrub: 1.5,
            invalidateOnRefresh: true,
            // once: true,
          },
        })
      })
    })

    // logo动画
    const logo = document.querySelector('.nav-logo')
    if (logo) {
      // 计算屏幕中心位置
      const screenCenterX = window.innerWidth / 2
      const screenCenterY = window.innerHeight / 2

      // 使用GSAP的transformOrigin来确保缩放时以中心点进行缩放
      gsap.set(logo, {
        scale: 3.5,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        xPercent: -50,
        yPercent: -50,
        x: screenCenterX,
        y: screenCenterY,
        transformOrigin: 'center center',
      })

      // 创建从中心到左上角的动画
      gsap.to(logo, {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: '.top-container',
          start: 'top 0',
          end: '+=100vh',
          scrub: 2,
          invalidateOnRefresh: true,
        },
      })
    }

    // 下箭头动画
    const downArrow = document.querySelector('.down-arrow')
    if (downArrow) {
      // 箭头从屏幕上方移动到下方的动画
      gsap.fromTo(
        downArrow,
        {
          yPercent: -100, // 初始位置：屏幕上方（隐藏）
          opacity: 0,
        },
        {
          yPercent: -10, // 结束位置：原始位置
          opacity: 1,
          scrollTrigger: {
            trigger: '.top-container',
            start: '+=100vh',
            end: '+=200vh',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      )

      // 添加闪烁动画
      gsap.to(downArrow, {
        y: 8, // 下移距离
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'sine.inOut',
      })
    }

    // top-container 圆形过渡动画
    const topContainer = document.querySelector('.top-container')
    if (topContainer) {
      gsap.to(topContainer, {
        borderRadius: '0 0 50% 50%',
        scrollTrigger: {
          trigger: '.top-container',
          start: '+=150vh',
          end: '+=250vh',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }

    const nav = document.querySelector('.nav')
    // 创建一个滚动触发器，固定 top-container 元素
    const topContainerTrigger = ScrollTrigger.create({
      trigger: '.top-container',
      start: 'top 0',
      end: '+=250vh', // 增加滚动距离以适应动画
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
      gsap.killTweensOf(logo) // 销毁 logo 动画
      gsap.killTweensOf(downArrow) // 销毁下箭头动画
      gsap.killTweensOf(topContainer) // 销毁 top-container 动画
      items.forEach(item => {
        gsap.killTweensOf(item) // 销毁字符动画
      })
    }
  }, [])

  return (
    <>
      <div className="main-container">
        <div className="nav">
          <img src="/logo.svg" alt="Logo" className="nav-logo" />
        </div>
        <section className="top-container">
          <div className="char-container">
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
            <div className="item">Selam</div>
          </div>
          <DoubleRightOutlined className="down-arrow" />
        </section>
      </div>
    </>
  )
}

export default A
