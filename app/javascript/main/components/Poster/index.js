// src/components/Poster/index.jsx

import React from 'react'
import { Link } from 'react-router-dom'

// Components
import PosterControls from './components/PosterControls'

const Poster = (props) => (
  <div
    className={props.containerClass}
    style={props.containerStyle}
    onMouseOver={props.mouseOver}
    onMouseLeave={props.mouseLeave}
  >
    <Link to={`/movies/${props.movie.id}`}>
      <div className="poster" style={props.posterImage}></div>
      <div className="poster-overlay"></div>
    </Link>

    <PosterControls
      movie={props.movie}
      hoverItem={props.hoverItem}
      slideItem={props.slideItem}
    />
  </div>
)

// const Poster = (props) => {
//   if (typeof props.movie !== 'object') return null

//   return (
//     <div
//       className={props.containerClass}
//       style={props.containerStyle}
//       onMouseOver={props.mouseOver}
//       onMouseLeave={props.mouseLeave}
//     >
//       <Link to={`/movies/${props.movie.id}`}>
//         <div className="poster" style={props.posterImage}></div>
//         <div className="poster-overlay"></div>
//       </Link>

//       <PosterControls
//         movie={props.movie}
//         hoverItem={props.hoverItem}
//         slideItem={props.slideItem}
//       />
//     </div>
//   )
// }

export default Poster
