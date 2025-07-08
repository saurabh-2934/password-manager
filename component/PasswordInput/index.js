import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordHistory from '../PasswordHistory'
import './index.css'

const initialList = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6']
class PasswordInput extends Component {
  state = {
    userList: [],
    webName: '',
    username: '',
    password: '',
    searchInput: '',
    isChecked: false,
  }

  onChangeWebname = event => {
    this.setState({
      webName: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {webName, username, password} = this.state

    const classNameForProfile =
      initialList[Math.ceil(Math.random() * initialList.length - 1)]

    const newUser = {
      id: uuidv4(),
      webName,
      username,
      password,
      classNameForProfile,
    }
    if (webName !== '' && username !== '' && password !== '') {
      this.setState(prevState => ({
        userList: [...prevState.userList, newUser],
        webName: '',
        username: '',
        password: '',
      }))
    }
  }

  onDeleteButton = id => {
    const {userList} = this.state

    const updatedUserList = userList.filter(eachUser => eachUser.id !== id)
    this.setState({
      userList: updatedUserList,
    })
  }

  onToggleCheckbox = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {
      userList,
      isChecked,
      searchInput,
      username,
      webName,
      password,
    } = this.state
    const searchResult = userList.filter(eachUser =>
      eachUser.webName
        .toLocaleLowerCase()
        .includes(searchInput.toLocaleLowerCase()),
    )
    const count = searchResult.length
    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="cart">
          <form className="cart-container" onSubmit={this.onSubmitForm}>
            <h1 className="heading">Add New Password</h1>
            <div className="cart-container-1">
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-logo"
                />
                <input
                  value={webName}
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  onChange={this.onChangeWebname}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-logo"
                />
                <input
                  value={username}
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-logo"
                />
                <input
                  value={password}
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  onChange={this.onChangePassword}
                />
              </div>
            </div>
            <button type="submit" className="btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager"
          />
        </div>
        <div className="cart-2">
          <div className="password-nav">
            <div className="nav-heading-container">
              <h1 className="nav-heading">Your Passwords</h1>
              <p className="count">{count}</p>
            </div>
            <div className="input-search">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-logo"
              />
              <input
                type="search"
                placeholder="Search"
                className="input-for-search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <div className="label-container">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              onChange={this.onToggleCheckbox}
            />
            <label htmlFor="checkbox" className="label">
              Show passwords
            </label>
          </div>
          {searchResult.length === 0 && (
            <div className="password-history-manager">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password"
              />
              <p className="para">No Passwords</p>
            </div>
          )}
          {searchResult.length !== 0 && (
            <ul className="password-list-container">
              {searchResult.map(eachUser => (
                <PasswordHistory
                  key={eachUser.id}
                  eachUser={eachUser}
                  onDeleteButton={this.onDeleteButton}
                  isChecked={isChecked}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordInput
