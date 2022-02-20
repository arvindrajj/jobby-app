import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    showSubmitError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username === '' && password === '') {
      // eslint-disable-next-line no-alert
      alert('Enter valid input')
    } else if (username === '') {
      // eslint-disable-next-line no-alert
      alert('Enter valid input')
    } else if (password === '') {
      // eslint-disable-next-line no-alert
      alert('Enter valid input')
    }
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({
        errorMessage: data.error_msg,
        showSubmitError: true,
      })
    }
  }

  render() {
    const {username, password} = this.state
    const {errorMessage, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-app-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo"
          />
          <div className="input-container">
            <label htmlFor="username" className="input-label">
              username
            </label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="input-field"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="input-label">
              password
            </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="input-field"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    )
  }
}
