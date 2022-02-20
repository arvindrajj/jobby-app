import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill, BsBoxArrowRight} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <ul className="nav-mobile-icons-container">
            <li className="nav-mobile-icons-item">
              <Link to="/" className="nav-mobile-home">
                <AiFillHome size="30" color="#f8fafc" />
              </Link>
            </li>
            <li className="nav-mobile-icons-item">
              <Link to="/jobs" className="nav-mobile-jobs">
                <BsFillBriefcaseFill size="30" color="#f8fafc" />
              </Link>
            </li>
            <li className="nav-mobile-icons-item">
              <button
                type="button"
                className="nav-mobile-btn"
                onClick={onClickLogout}
              >
                <BsBoxArrowRight size="30" color="#f8fafc" />
              </button>
            </li>
          </ul>
        </div>
        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
