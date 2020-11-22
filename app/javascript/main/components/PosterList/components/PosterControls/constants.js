import { STATIC } from '@utils'

const MOVE_DOWN = 'move-down'

const HIDDEN = 'hidden'

const STATUS_MAP = {
  [null]: {
    volume: STATIC,
    like: STATIC,
    unlike: STATIC,
  },
  [true]: {
    volume: MOVE_DOWN,
    like: 'move-down-selected',
    unlike: HIDDEN,
  },
  [false]: {
    volume: MOVE_DOWN,
    like: HIDDEN,
    unlike: 'selected',
  },
}

const LIKED_LIST = 'LikedList'

const UNLIKED_LIST = 'UnlikedList'

export {
  LIKED_LIST,
  STATUS_MAP,
  UNLIKED_LIST,
}
