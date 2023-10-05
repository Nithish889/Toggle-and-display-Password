import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import EachPassword from '../EachPassword'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    initialList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
  }

  submitPasswordForm = event => {
    event.preventDefault()

    const {website, username, password} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const item = {
      id: uuidV4(),
      website,
      username,
      password,
      initialClassName: initialBackgroundColorClassName,
    }

    console.log(item)
    this.setState(prevState => ({
      initialList: [...prevState.initialList, item],
      website: '',
      username: '',
      password: '',
    }))
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  updateWebsite = event => {
    this.setState({website: event.target.value})
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  removePasswordItem = id => {
    const {initialList} = this.state
    const filteredResults = initialList.filter(each => each.id !== id)
    this.setState({initialList: filteredResults})
  }

  renderList = () => {
    const {initialList, searchInput} = this.state
    const displayPasswordList = initialList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return displayPasswordList
  }

  updateCheckbox = event => {
    const item = event.target.value === true
    console.log(item)
  }

  render() {
    const {initialList, website, username, password, searchInput} = this.state
    const passwordLength = initialList.length
    const displayPasswordList = this.renderList()
    const passwordListIsNull =
      passwordLength === 0 || displayPasswordList.length === 0
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-form-img"
          />
          <div className="password-entry-container">
            <h1 className="password-head">Add New Password</h1>
            <form className="password-form" onSubmit={this.submitPasswordForm}>
              <div className="each-ele">
                <div className="icon">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="password-icon"
                  />
                </div>
                <hr className="vertical-line" />
                <input
                  className="each-input-ele"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.updateWebsite}
                />
              </div>
              <div className="each-ele">
                <div className="icon">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="password-icon"
                  />
                </div>
                <hr className="vertical-line" />
                <input
                  className="each-input-ele"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.updateUsername}
                />
              </div>
              <div className="each-ele">
                <div className="icon">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="password-icon"
                  />
                </div>
                <hr className="vertical-line" />
                <input
                  type="password"
                  className="each-input-ele"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.updatePassword}
                />
              </div>
              <div className="flex-end-button">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bottom-card-container">
          <div className="display-top-container">
            <h1 className="para"> Your Passwords</h1>

            <p className="no-of">{passwordLength}</p>

            <div className="search-full-bar">
              <div className="box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="lens"
                />
              </div>
              <hr className="line" />
              <input
                type="search"
                className="search-bar"
                placeholder="Search"
                value={searchInput}
                onChange={this.updateSearchInput}
              />
            </div>
          </div>
          <hr className="full-line" />
          <div className="show-passwords-checkbox">
            <input type="checkbox" id="myBox" className="dabba" />
            <label
              htmlFor="myBox"
              className="my-passwords"
              onChange={this.updateCheckcbox}
            >
              Show Passwords
            </label>
          </div>

          {passwordListIsNull ? (
            <div className="null-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="password-img"
              />
              <p className="no-para">No Passwords</p>
            </div>
          ) : (
            <ul className="list-of-passwords">
              {displayPasswordList.map(eachItem => (
                <EachPassword
                  eachPassword={eachItem}
                  key={eachItem.id}
                  deletePassword={this.removePasswordItem}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
