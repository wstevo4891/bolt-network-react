// app/javascript/animations/components/Box.jsx

import React from 'react'
import fadesUp from './fadesUp'

const Box = fadesUp(class extends React.Component {
  render() {
    return <div className="box"/>
  }
})

export default Box
