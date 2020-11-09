import React from 'react'
import PropTypes from 'prop-types'

import DisplayRow from './DisplayRow'

const ListRow = ({ label, list }) => {
  if (list.length === 1) {
    return <DisplayRow label={label.singular} value={list[0].name} />
  } else {
    let displayValue

    if (typeof list[0] === 'object') {
      displayValue = list.map((item) => item.name).join(', ')
    } else {
      displayValue = list.join(', ')
    }

    return <DisplayRow label={label.plural} value={displayValue} />
  }
}

ListRow.propTypes = {
  label: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }).isRequired,
  list: PropTypes.array.isRequired,
}

export default ListRow
