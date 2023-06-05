import React from 'react'
import "./AboutLinks.css"

function AboutLinks() {



  return (
    <div className='about-links'>

        <a className='github'
        rel="noreferrer"
        href='https://github.com/Benjamin-Ortiz'
        target='_blank'
        >
            <i className="fab fa-github-square fa-lg" style={{color: "#ffffff"}}/>
        </a>

        <a className='linked-in'
        rel="noreferrer"
        href='https://www.linkedin.com/in/benjamin-ortiz-05a367236/'
        target='_blank'
        >
        <i className="fab fa-linkedin fa-lg" style={{color: "#ffffff"}}></i>
        </a>

    </div>
  )
}

export default AboutLinks
