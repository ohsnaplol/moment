import React, { Component } from 'react'
// optimize later
import { faBandcamp, faTwitter, faTwitch, faXbox, faInstagram, faReddit, faTumblr, faMedium, faSoundcloud, faDeviantart ,faPinterest, faGithub, faFontAwesome, faFacebook, faSnapchatGhost } from '@fortawesome/fontawesome-free-brands'
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./style.css"

class NetworkTag extends Component {
  render() {
    const { network, username } = this.props

    function url() {
      if (network === 'Facebook') return `https://www.facebook.com/${username}`
      if (network === 'Snapchat') return `https://www.snapchat.com/add/${username}`
      if (network === 'Twitter') return `http://twitter.com/${username}`
      if (network === 'Twitch') return `http://twitch.tv/${username}`
      if (network === 'Xbox') return `https://account.xbox.com/en-us/Profile?GamerTag=${username}`
      if (network === 'Instagram') return `https://www.instagram.com/${username}`
      if (network === 'Reddit') return `https://www.reddit.com/user/${username}`
      if (network === 'Tumblr') return `https://${username}.tumblr.com`
      if (network === 'Bandcamp') return `https://${username}.bandcamp.com/`
      if (network === 'Medium') return `https://medium.com/@${username}`
      if (network === 'Soundcloud') return `https://soundcloud.com/${username}`
      if (network === 'Deviantart') return `https://${username}.deviantart.com/`
      if (network === 'Pinterest') return `https://www.pinterest.com/${username}/`
      if (network === 'Github') return `https://github.com/${username}`
      return 'Unknown network'
    }

    function icon() {
      if (network === 'Facebook') return faFacebook
      if (network === 'Snapchat') return faSnapchatGhost
      if (network === 'Twitter') return faTwitter
      if (network === 'Twitch') return faTwitch
      if (network === 'Xbox') return faXbox
      if (network === 'Instagram') return faInstagram
      if (network === 'Reddit') return faReddit
      if (network === 'Tumblr') return faTumblr
      if (network === 'Bandcamp') return faBandcamp
      if (network === 'Medium') return faMedium
      if (network === 'Soundcloud') return faSoundcloud
      if (network === 'Deviantart') return faDeviantart
      if (network === 'Pinterest') return faPinterest
      if (network === 'Github') return faGithub      
      return faFontAwesome
    }

    function snippet(bgcolor, logocolor, textcolor, text) {
      return (
        <a href={url()} target="blank">
          <div style={{ backgroundColor: bgcolor }} className='network-tag-container'>
            <FontAwesomeIcon color={logocolor} icon={icon()} size='3x' />
            <span style={{ color: textcolor }} className='network-tag-text'>{text}</span>
          </div>
        </a>
      )
    }

    switch (network) {
      case 'Facebook':
        return snippet(
          'rgb(59, 89, 152)',
          'white',
          'white',
          'Facebook'
        );
      case 'Snapchat':
        return snippet(
          'rgb(255, 251, 83',
          'white',
          'black',
          username,
        );
      case 'Twitch':
        return snippet(
          'rgb(72, 56, 120',
          'white',
          'white',
          username,
        );
      case 'Twitter':
        return snippet(
          'rgb(29, 161, 242)',
          'white',
          'white',
          username,
        );
      case 'Linkedin':
        return snippet(
          'rgb(0, 119, 181)',
          'white',
          'white',
          'LinkedIn',
        );
      case 'Youtube':
        return snippet(
          'white',
          'rgb(236, 51, 36)',
          'black',
          username,
        );
      case 'Reddit':
        return snippet(
          'white',
          'rgb(237, 85, 40)',
          'black',
          username,
        );
      case 'Instagram':
        return snippet(
          'rgb(229, 221, 210)',
          'rgb(101, 71, 62)',
          'rgb(101, 71, 62)',
          username,
        );
      case 'Tumblr':
        return snippet(
          'rgb(57, 70, 91)',
          'white',
          'white',
          username,
        );
      case 'Flickr':
        return snippet(
          'rgb(56, 56, 56)',
          'white',
          'white',
          username,
        );
      case 'Steam':
        return snippet(
          'black',
          'white',
          'white',
          username,
        );
      case 'xbox':
        return snippet(
          'green',
          'white',
          'white',
          username,
        );
      case 'playstation':
        return snippet(
          'rgb(0, 55, 145)',
          'white',
          'white',
          username,
        );
      case 'pinterest':
        return snippet(
          'rgb(246, 245, 243)',
          'rgb(189, 8, 28)',
          'black',
          username,
        );
      case 'google':
        return snippet(
          'white',
          'rgb(204, 79, 64)',
          'black',
          username,
        );
      case 'github':
        return snippet(
          'rgb(37, 41, 46',
          'white',
          'white',
          username,
        );
      case 'deviantart':
        return snippet(
          'rgb(75, 91, 78)',
          'rgb(89, 200, 89)',
          'white',
          username,
        );
      case 'bandcamp':
        return snippet(
          'rgb(107, 145, 155)',
          'white',
          'white',
          username,
        );
      case 'soundcloud':
        return snippet(
          'rgb(238, 97, 43)',
          'white',
          'white',
          username,
        );
      case 'medium':
        return snippet(
          'white',
          'black',
          'black',
          username,
        );
      case 'gitlab':
        return snippet(
          'white',
          'rgb(236, 117, 60)',
          'black',
          username,
        );
      default:
        return snippet();
    }
  }
}

export default NetworkTag