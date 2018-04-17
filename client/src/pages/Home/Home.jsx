import React, { Component } from 'react'
import "./style.css";
import API from '../../utils/API'
import NetworkTag from '../../components/NetworkTag'
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor() {
    super()
    this.state= {
      _id: '',
      followerData: []
    }
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
      followerObject = response.filter(item => response.data).map(element => {
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
      <div>
        {this.props.loggedIn && this.state.followerData ? (
          <div>
            {this.state.followerData.map((user, idx) => (
              <div key={idx}>
                <Link to={'/profile/'+user._id}><h2>{user.realName}</h2></Link>
                {user.socialNetworks.map((network, id) => (
                  <NetworkTag key={id} network={network.networkName} username={network.userName} url={network.url}/>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>loading</h1>
          </div>
        )}
      </div>
    )
  }
}

export default Home;
