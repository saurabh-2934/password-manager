import './index.css'

const PasswordHistory = props => {
  const {eachUser, onDeleteButton, isChecked} = props
  const {id, webName, password, username, classNameForProfile} = eachUser
  const initial = webName[0].toUpperCase()
  const passwordHidden =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

  const onToggleDelete = () => {
    onDeleteButton(id)
  }

  return (
    <li className="detele-password-container">
      <div className="user-container">
        <p className={`initial ${classNameForProfile}`}>{initial}</p>
        <div>
          <p className="webname">{webName.toLowerCase()}</p>
          <p className="username">{username.toLowerCase()}</p>
          {isChecked && <p className="password">{password}</p>}
          {!isChecked && (
            <p>
              <img src={passwordHidden} alt="stars" className="stars" />
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        className="del-btn"
        onClick={onToggleDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}

export default PasswordHistory
