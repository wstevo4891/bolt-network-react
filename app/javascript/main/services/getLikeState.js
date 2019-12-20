// Movie Like State Service

import SessionList from './SessionList'

function getLikeState(movie) {
  const likedList = new SessionList(movie, 'LikedList')
  const unlikedList = new SessionList(movie, 'UnlikedList')

  if (likedList.findMovie()) {
    return true

  } else if (unlikedList.findMovie()) {
    return false

  } else {
    return null
  }
}

export default getLikeState
