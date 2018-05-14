import React, { Component } from 'react'
import "./style.css"
import API from '../../utils/API'
import NetworkTag from '../../components/NetworkTag'
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor() {
    super()
    this.state = {}
  }

  getUserData(id) {
    API.getUser(id)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
  }

  // This should be changed to a single call as opposed to
  // one call for every element
  getFollowerData() {
    let promiseQueue = []
    let followerObject
    this.state.following.forEach(element => {
      promiseQueue.push(API.getUser(element))
    })
    Promise.all(promiseQueue).then((response) => {
      followerObject = response.filter(item => item.data).map(element => {
        return element.data
      })
      this.setState({
        followerData: followerObject
      })
    })
  }

  componentDidMount() {
    if (this.props.uid) {
      API.getUser(this.props.uid)
        .then(response => {
          this.setState(response.data)
          this.getFollowerData()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uid) {
      API.getUser(nextProps.uid)
        .then(response => {
          this.setState(response.data)
          this.getFollowerData()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  render() {
    return (
      <div className='container'>
        {this.props.loggedIn && this.state.followerData && (
          <div className="mt-4">
            {this.state.followerData.length === 0 ? (
              <h2>
                You aren't following anyone on Scoop yet. 
                Look up someone you know and follow them!
              </h2>
            ) : (
                <div>
                  {this.state.followerData.map((user, idx) => (
                    <div className="mb-3" key={idx}>
                      <Link to={'/profile/' + user._id}><h2>{user.realName}</h2></Link>
                      {user.socialNetworks.filter(function (network) {
                        // TODO: (Important) this will only display public profiles
                        // even though the client still technically receives the data.
                        // This is a temporary solution for demonstration purposes
                        // This MUST be fixed or else private/secret data isn't really private.
                        return network.privacy === 'public'
                      }).map((network, id) => (
                        <NetworkTag key={id} network={network.networkName} username={network.userName} url={network.url} />
                      ))}
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}
      </div>
    )
  }
}

export default Home;
