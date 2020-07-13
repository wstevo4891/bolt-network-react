// app/javascript/main/scenes/MyList/components/ListEmpty.jsx

import React from 'react'
import { Link } from 'react-router-dom'

const ListEmpty = () => (
  <div className="row justify-content-center">
    <div className="col-10 col-sm-8 col-md-6 col-lg-4 mt-5" style={{ color: 'white' }}>
      <h2>Your List is Empty</h2>

      <p>
        Add movies to your list by clicking on the Add to List buttons
        that appear when you hover the cursor over a movie image.
      </p>
      
      <p>
        You may also add the movies in the home page slider.
        Click on the &quot;+ My List&quot; button.
      </p>

      <p>Return to the <Link to="/">Home Page</Link> and try it out.</p>
    </div>
  </div>
)

export default ListEmpty
