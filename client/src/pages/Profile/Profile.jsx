import React, { Component } from 'react'
import API from "../../utils/API"
import { withRouter } from 'react-router';
import NetworkTag from '../../components/NetworkTag'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      realName: '',
      nicknames: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    API.getUser(this.props.id) // normally use this.props.id
      .then(response => {
        this.setState(response.data)
        console.log('user data: ' + JSON.stringify(this.state))
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <h1>{this.state.realName}</h1>
      </div>
    )
  }
}

export default withRouter(Profile);
