import React, { Component } from 'react'
import { withRouter } from 'react-router';
import API from '../../utils/API'

class Settings extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit = event => {
    event.preventDefault()
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  getUserData(id) {
    API.getUser(id)
      .then(response => {
        this.setState(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  saveState() {
    const id = this.props.id
    API.update(id)
  }

  componentDidMount() {
    if(this.props.uid) {
      this.getUserData(this.props.uid)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getUserData(nextProps.uid)
  }

  render() {
    return (
      <div>
        {this.state._id ? (
          <div>
            <p>{JSON.stringify(this.state)}</p>
          </div>
        ) : (
          <p>Loading</p>
        )}
        <form onSubmit={this.saveState}>
          <label>
            Change name:
            {/* <input value={this.state.realName}/> */}
          </label>
          <label>
            Add Network
            {/* Only fill list based on what network they have not added */}
            <select>
              <option default value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
              <option value="Snapchat">Snapchat</option>
              <option value="YouTube">YouTube</option>
            </select>
          </label>
        </form>
      </div>
    )
  }
}

export default withRouter(Settings)
