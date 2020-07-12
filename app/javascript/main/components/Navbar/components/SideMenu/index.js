// app/javascript/main/components/Navbar/containers/SideMenu.jsx

import React from 'react'
import PropTypes from 'prop-types'

// Components
import MenuItem from './MenuItem'

const SideMenu = (props) => {

  const translateX = props.display ? '0px' : '-9rem'

  const path = props.location.pathname

  const handleClick = () => setTimeout(props.toggleDisplay(), 1000)

  return(
    <div
      id="side-menu"
      style={{ transform: `translate3d(${translateX}, 0px, 0px)` }}
    >
      <ul className="navbar-nav">
        <MenuItem
          id="home-link"
          path={path}
          href="/"
          text="Home"
          handleClick={handleClick}
        />

        <MenuItem
          id="my-list-link"
          path={path}
          href="/my-list"
          text="My List"
          handleClick={handleClick}
        />

        <MenuItem
          id="recent-link"
          path={path}
          href="/recent"
          text="Recently Added"
          handleClick={handleClick}
        />

        {props.genres.map((genre, index) =>
          <MenuItem
            key={index.toString()}
            id={`genre-link-${index}`}
            path={path}
            href={genre.url}
            text={genre.text}
            handleClick={handleClick}
          />
        )}
      </ul>
    </div>
  )
}

SideMenu.propTypes = {
  display: PropTypes.bool,
  location: PropTypes.object,
  genres: PropTypes.array,
  toggleDisplay: PropTypes.func
}

export default SideMenu
