import React from 'react'
import PropTypes from 'prop-types'

// Components
import NavItem from './NavItem'

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
        <NavItem
          id="home-link"
          path={path}
          href="/"
          text="Home"
          handleClick={handleClick}
        />

        <NavItem
          id="my-list-link"
          path={path}
          href="/my-list"
          text="My List"
          handleClick={handleClick}
        />

        <NavItem
          id="recent-link"
          path={path}
          href="/recent"
          text="Recently Added"
          handleClick={handleClick}
        />

        {props.genres.map((genre, index) =>
          <NavItem
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
  display: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired,
  toggleDisplay: PropTypes.func.isRequired,
}

export default SideMenu
