import React, { useEffect, useRef } from "react";

import dallas from "../images/dallas.webp";
import austin from "../images/austin.webp";
import newyork from "../images/newyork.webp";
import sanfrancisco from "../images/sanfrancisco.webp";
import beijing from "../images/beijing.webp";
import { useTrail, animated, useSpring, useSprings } from "react-spring";
import { useHover } from "react-use-gesture";

const cities = [
  { name: "Dallas", image: dallas },
  { name: "Austin", image: austin },
  { name: "New York", image: newyork },
  { name: "San Francisco", image: sanfrancisco },
  { name: "Beijing", image: beijing }
]

const HamburgerMenu = ({ state }) => {
  const trail = useTrail(2, {
    xy: state.clicked ? [0, 0] : [-99, 0],
    from: { xy: [-99, 0] },
    reverse: !state.clicked,
  })
  const [spring, setSpring] = useSpring(() => ({ width: 0 }))
  const [skews, setSkews] = useSprings(3, () => ({
    skew: 0,
    y: 0
  }))

  const menuLinkHover = useHover(({ args: [index] }) => {
    setSkews(i => {
      if (index !== i) return { skew: 0 }
      console.log(index, skews[i].skew.getValue())
      return { skew: 4, y: 3 }
    })
  })

  useEffect(() => {
    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      // If menu is closed and we want to open it.
      setSpring({ width: 0 })
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      setSpring({ width: 100 })
      // fadeInUp(info)
      // staggerText(line1, line2, line3)
    }
  }, [state])

  return (
    <animated.div className="hamburger-menu" style={{ width: spring.width.interpolate((w) => `${w}%`) }}>
      {trail.map(({ xy }, index) => {
        if (index === 0) {
          return (
            <animated.div
              key={index}
              className='menu-secondary-background-color'
              style={{ transform: xy.interpolate((x, y) => `translate3d(${x}%, ${y}, 0)`) }}
            ></animated.div>
          )
        } else if (index === 1) {
          return (
            <animated.div
              key={index}
              className='menu-layer'
              style={{ transform: xy.interpolate((x, y) => `translate3d(${x}%, ${y}, 0)`) }}
            >
              <div className='menu-city-background'></div>
              <div className='container'>
                <div className='wrapper'>
                  <div className='menu-links'>
                    <nav>
                      <ul>
                        {skews.map(({ skew }, i) => (
                          <li {...menuLinkHover(i)}>
                            <animated.a
                              // onMouseEnter={e => handleHover(e)}
                              // onMouseOut={e => handleHoverExit(e)}
                              // onBlur={e => handleHoverExit(e)}
                              key={100 + i}
                              href='/opportunities'
                              role="button"
                              style={{ transform: skew.interpolate((skew) => `skewX(${skew}deg)`) }}
                            >
                              Opportunities
                            </animated.a>
                          </li>
                        ))}
                        {/* <li>
                          <a
                            // onMouseEnter={e => handleHover(e)}
                            // onMouseOut={e => handleHoverExit(e)}
                            // onBlur={e => handleHoverExit(e)}
                            href='/solutions'
                            role="button"
                          >
                            Solutions
                          </a>
                        </li>
                        <li>
                          <a
                            // onMouseEnter={e => handleHover(e)}
                            // onMouseOut={e => handleHoverExit(e)}
                            // onBlur={e => handleHoverExit(e)}
                            href='/contact-us'
                            role="button"
                          >
                            Contact us
                          </a>
                        </li> */}
                      </ul>
                    </nav>
                    <div className='info'>
                      <h3>Our Promise</h3>
                      <p>
                        The passage experienced a surge in popularity during the 1960s
                        when Letraset used it on their dry-transfer sheets, and again
                        during the 90s as desktop publishers bundled the text with
                        their software.
                  </p>
                    </div>
                  </div>
                  <div className='locations'>
                    Locations:
                  {/* Returning the list of cities */}
                    {cities.map((el, i) => (
                      <span
                        key={el.name}
                        // onMouseEnter={() => handleCity(el.image, cityBackground)}
                        // onMouseOut={() => handleCityReturn(cityBackground)}
                        // onBlur={() => handleCityReturn(cityBackground)}
                        role="button"
                        tabIndex={20 + i}
                      >
                        {el.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </animated.div>
          )
        }
      })}
    </animated.div>
  )
}

export default HamburgerMenu