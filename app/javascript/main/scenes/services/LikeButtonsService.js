// app/javascript/main/scenes/services/LikeButtonService.js

export default class LikeButtonsService {
  constructor(component, target) {
    // component: PosterControls component
    this.component = component

    // liked: value of component.state.liked
    this.liked = component.state.liked

    // target: event.target, <i> with icon class
    this.target = target

    // parent: <li> parent element of target
    this.parent = target.parentNode.parentNode

    // Find volumeBtn and otherBtn
    this.findButtons()
  }

  // Assigns remaining two attributes:
  //   action: "like" or "unlike"
  //   volumeBtn: <li> parent of volume button
  //   otherBtn: <li> parent of like or unlike button 
  findButtons = () => {
    if (this.parent.classList.contains('poter-btn-like')) {
      this.action = 'like'
      this.volumeBtn = this.parent.previousSibling
      this.otherBtn = this.parent.nextSibling

    } else {
      this.action = 'unlike'
      this.otherBtn = this.parent.previousSibling
      this.volumeBtn = this.otherBtn.previousSibling
    }
  }

  call = () => {
    // Return if the target is not an <i> with a font-awesome class
    // Prevents glitches if the target is a parent element
    if (!this.target.classList.contains('fa')) return

    if (this.action === 'like') {
      return this.likeMovie()
    } else {
      return this.unlikeMovie()
    }
  }

  likeMovie = () => {
    if (this.liked === null) {
      this.component.setState({
        liked: true
      })

      this.target.classList.remove('fa-thumbs-o-up')
      this.target.classList.add('fa-thumbs-up')

      this.volumeBtn.classList.add('move-down')
      this.parent.classList.add('move-down')
      
    } else {  
      this.target.classList.remove('fa-thumbs-up')
      this.target.classList.add('fa-thumbs-o-up')

      this.volume.classList.remove('move-down')
      this.volume.classList.add('move-up')

      this.parent.classList.remove('move-down')
      this.parent.classList.add('move-up')

      setTimeout(() => {
        this.component.setState({
          liked: null
        })
      }, 900)

      setTimeout(() => {
        this.volume.classList.remove('move-up')
        this.parent.classList.remove('move-up')
      }, 1500)
    }
  }

  unlikeMovie = () => {
    if (liked === null) {
      this.setState({
        liked: false
      })

      this.target.classList.remove('fa-thumbs-o-down')
      this.target.classList.add('fa-thumbs-down')

      this.volume.classList.add('move-down')
    
    } else {
      this.target.classList.remove('fa-thumbs-down')
      this.target.classList.add('fa-thumbs-o-down')

      this.volume.classList.remove('move-down')
      this.volume.classList.add('move-up')

      setTimeout(() => {
        this.component.setState({
          liked: null
        })
      }, 900)

      setTimeout(() => {
        this.volume.classList.remove('move-up')
      }, 1500)
    }
  }
}

