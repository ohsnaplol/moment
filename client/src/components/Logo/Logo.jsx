import React from 'react'
import './style.css'

const Logo = (props) => {
  return (
    <div>
      <svg width="115px" className="login-logo">
      <ellipse className="honey-head" transform="matrix(0.9899 0.1416 -0.1416 0.9899 18 0)" fill="white" cx="54.196" cy="69.903" rx="43.351" ry="38.201"/>

      <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 18 0)" fill="white" cx="41.894" cy="106.733" rx="18.195" ry="9.59"/>

      <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 18 0)" fill="white" cx="68.167" cy="104.422" rx="18.195" ry="9.591"/>

      <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 18 0)" fill="white" cx="87.537" cy="97.503" rx="18.194" ry="9.592"/>

      <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 18 0)" fill="white" cx="18.702" cy="93.726" rx="18.195" ry="9.592"/>
      <path className="honey-stem" transform="matrix(0.9899 0.1416 -0.1416 0.9899 18 0)" fill="#F5DEB3" d="M68.673,22.524c0,0,3.6-17.221,11.463-22.524c0,0,3.871,1.068,2.842,2.46c0,0,0.129,1.768-1.176,2.238
      l-1.398-1.989c0,0-5.793-0.131-9.715,19.514L68.673,22.524z"/>
      <circle className="honey-cherry" transform="matrix(0.9899 0.1416 -0.1416 0.9899 18 0)" fill="#C41617" cx="67.606" cy="28.795" r="10.673"/>

      <ellipse className="honey-leftEye" transform="matrix(0.989 -0.148 0.148 0.989 0 10)" fill="#010202" cx="40.374" cy="66.952" rx="1.359" ry="1.789"/>

      <ellipse className="honey-rightEye" transform="matrix(0.9889 -0.1484 0.1484 0.9889 0 10)" fill="#010202" cx="70.142" cy="69.318" rx="1.359" ry="1.789"/>
      <path className="honey-mouth" transform="matrix(0.9899 0.1416 -0.1416 0.9899 21 0)" fill="#010202" d="M41.833,79.758l27.78,1.128C69.612,80.886,56.448,94.285,41.833,79.758z"/>
    </svg>               
    <h1 className="scoop-h1">
      Scoop
    </h1>
  </div>
  )
}

export default Logo