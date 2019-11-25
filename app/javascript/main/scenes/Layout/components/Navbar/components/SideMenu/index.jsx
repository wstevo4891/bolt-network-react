// app/javascript/main/components/Navbar/containers/SideMenu.jsx

import React from 'react'

// Components
import MenuItem from './components/MenuItem'

import './styles/index.scss'

const SideMenu = (props) => {

  const path = props.location.pathname

  const handleClick = () => {
    setTimeout(props.toggleDisplay(), 1000)
  }

  const containerStyle = () => {
    if (props.display) {
      return { transform: 'translate3d(0px, 0px, 0px)' }
    } else {
      return { transform: 'translate3d(-9rem, 0px, 0px)' }
    }
  }

  return(
    <div id="side-menu" style={containerStyle()}>
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
            key={index}
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

export default SideMenu
