import React, { useState } from "react"
import { animated, useSpring } from "react-spring"

import video1 from "../videos/websites.mp4"
import video2 from "../videos/apps.mp4"
import video3 from "../videos/branding.mp4"

const data = [
  { id: 1, title: 'Websites', slug: 'websites', video: video1 },
  { id: 2, title: 'Apps', slug: 'apps', video: video2 },
  { id: 3, title: 'Branding', slug: 'branding', video: video3 },
]
const trans = (x, y) => `translateX(${x}px) translateY(${y}px)`

const IndexPage = () => {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [scale, setScale] = useSpring(() => ({ s: 0 }))
  const [blended, setBlended] = useState(false)
  const [cursorPos, setCursorPos] = useSpring(() => ({ xy: [400, 400], opacity: 1, config: { mass: 1, tension: 200, friction: 24 } }))
  const mouseMove = (scale, index) => {
    setScale({ s: scale })
    setCurrentVideo(index)
    if (scale === 1.2) {
      setBlended(true)
    } else {
      setBlended(false)
    }
  }

  return (
    <>
      <div
        id="homePage"
        onMouseEnter={() => setCursorPos({ opacity: 1 })}
        onMouseMove={e => setCursorPos({ xy: [e.clientX, e.clientY] })}
        onMouseLeave={() => setCursorPos({ opacity: 0 })}
        onBlur={() => setCursorPos({ opacity: 0 })}
        role="button"
        tabIndex="0"
      >

        <section className="hero">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-inner-banner">
                <div className="hero-inner-col left"></div>
                <div className="hero-inner-col right">
                  <div className="hero-inner-title">
                    <h1>We make it happen</h1>
                  </div>
                  <div className="hero-inner-links">
                    {data.map((item, i) => (
                      <div
                        className="hero-inner-link-item"
                        key={item.id}
                        onMouseEnter={() => mouseMove(0.8, i)}
                        onMouseLeave={() => mouseMove(0, i)}
                        role="button"
                        tabIndex={i}
                      >
                        <div className="hero-inner-link-item-padding"></div>
                        <a
                          href="/"
                          onMouseEnter={() => mouseMove(1.2, i)}
                          onMouseLeave={() => mouseMove(0.8, i)}
                        >
                          <span>{item.title}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-inner-footer">
              <div className="hero-inner-footer-text">
                <p>
                  Leading digital agency with solid design and development
                  expertise. We build readymade websites, mobile applications, and
                  elaborate online business services.
                    </p>
              </div>
            </div>
          </div>
        </section>

        <div className="chat">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30" id="chat">
            <path
              d="M16 26c8.84 0 16-5.82 16-13S24.84 0 16 0 0 5.82 0 13a11.72 11.72 0 004.12 8.71L3.33 30l7.53-4.69A19.11 19.11 0 0016 26z"
            ></path>
          </svg>
        </div>

        <animated.div
          className={`cursor ${blended ? 'media-blend' : ''}`}
          style={{ transform: cursorPos.xy.interpolate(trans), opacity: cursorPos.opacity.interpolate(o => o) }}
        >
          <animated.div className="cursor-media" style={{ transform: scale.s.interpolate(s => `scale(${s})`) }}>
            {data.map((item, i) => (
              <animated.video
                key={item.id}
                src={item.video}
                preload="auto"
                autoPlay
                muted
                loop
                id={item.slug}
                style={{ zIndex: i === currentVideo ? 4 : 1 }}
              ></animated.video>
            ))}
          </animated.div>
        </animated.div>

      </div>
    </>
  )
}

export default IndexPage