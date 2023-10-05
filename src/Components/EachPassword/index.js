import './index.css'

const EachPassword = props => {
  const {eachPassword, deletePassword} = props
  const {website, username, initialClassName, id} = eachPassword
  const letter = website[0]

  const passPasswordId = () => {
    deletePassword(id)
  }
  return (
    <li className="each-password">
      <h1 className={initialClassName}>{letter}</h1>

      <div className="delete-details-container">
        <div className="details-container">
          <p className="website">{website}</p>
          <p className="username">{username}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="password"
          />
        </div>
        <button
          type="button"
          className="delete-item"
          onClick={passPasswordId}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="bin"
          />
        </button>
      </div>
    </li>
  )
}

export default EachPassword
