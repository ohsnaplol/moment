import React, { Component } from 'react'
// eslint-disable-next-line
import brands from '@fortawesome/fontawesome-free-brands'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import "./style.css"

class NetworkTag extends Component {
  render() {
    const { network, username, url } = this.props

    function setUpUrl(url) {
      if (network === 'twitter') return `http://twitter.com/${username}`
      if (network === 'twitch') return `http://twitch.tv/${username}`
      return insertHttpsIfMissing(url)
    }

    function insertHttpsIfMissing(url) {
      if (url.startsWith('http://') || url.startsWith('https://'))
        return url
      else
        return `http://${url}`
    }

    function snippet(fanetworkname, bgcolor, logocolor, textcolor, text) {
      return (
        <a href={setUpUrl(url)} target="blank">
          <div style={{ backgroundColor: bgcolor }} className='network-tag-container'>
            <FontAwesomeIcon color={logocolor} icon={["fab", fanetworkname]} size='3x' />
            <span style={{ color: textcolor }} className='network-tag-text'>{text}</span>
          </div>
        </a>
      )
    }

    switch (network) {
      case 'facebook':
        return snippet(
          'facebook',
          'rgb(59, 89, 152)',
          'white',
          'white',
          'Facebook'
        );
      case 'snapchat':
        return snippet(
          'snapchat-ghost',
          'rgb(255, 251, 83',
          'white',
          'black',
          username,
        );
      case 'twitch':
        return snippet(
          'twitch',
          'rgb(72, 56, 120',
          'white',
          'white',
          username,
        );
      case 'twitter':
        return snippet(
          'twitter',
          'rgb(29, 161, 242)',
          'white',
          'white',
          username,
        );
      case 'linkedin':
        return snippet(
          'linkedin',
          'rgb(0, 119, 181)',
          'white',
          'white',
          'LinkedIn',
        );
      case 'youtube':
        return snippet(
          'youtube',
          'white',
          'rgb(236, 51, 36)',
          'black',
          username,
        );
      case 'reddit':
        return snippet(
          'reddit',
          'white',
          'rgb(237, 85, 40)',
          'black',
          username,
        );
      case 'instagram':
        return snippet(
          'instagram',
          'rgb(229, 221, 210)',
          'rgb(101, 71, 62)',
          'rgb(101, 71, 62)',
          username,
        );
      case 'tumblr':
        return snippet(
          'tumblr',
          'rgb(57, 70, 91)',
          'white',
          'white',
          username,
        );
      case 'flickr':
        return snippet(
          'flickr',
          'rgb(56, 56, 56)',
          'white',
          'white',
          username,
        );
      case 'steam':
        return snippet(
          'steam',
          'black',
          'white',
          'white',
          username,
        );
      case 'xbox':
        return snippet(
          'xbox',
          'green',
          'white',
          'white',
          username,
        );
      case 'playstation':
        return snippet(
          'playstation',
          'rgb(0, 55, 145)',
          'white',
          'white',
          username,
        );
      case 'pinterest':
        return snippet(
          'pinterest',
          'rgb(246, 245, 243)',
          'rgb(189, 8, 28)',
          'black',
          username,
        );
      case 'google':
        return snippet(
          'google-plus',
          'white',
          'rgb(204, 79, 64)',
          'black',
          username,
        );
      case 'github':
        return snippet(
          'github',
          'rgb(37, 41, 46',
          'white',
          'white',
          username,
        );
      case 'deviantart':
        return snippet(
          'deviantart',
          'rgb(75, 91, 78)',
          'rgb(89, 200, 89)',
          'white',
          username,
        );
      case 'bandcamp':
        return snippet(
          'bandcamp',
          'rgb(107, 145, 155)',
          'white',
          'white',
          username,
        );
      case 'soundcloud':
        return snippet(
          'soundcloud',
          'rgb(238, 97, 43)',
          'white',
          'white',
          username,
        );
      case 'medium':
        return snippet(
          'medium',
          'white',
          'black',
          'black',
          username,
        );
      case 'gitlab':
        return snippet(
          'gitlab',
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