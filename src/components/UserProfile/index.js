import './index.css'

const UserProfile = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails
  return (
    <div className="user-app-container">
      <img src={profileImageUrl} alt="profile" className="profile-img" />
      <h1 className="name">{name}</h1>
      <p className="short-bio">{shortBio}</p>
    </div>
  )
}

export default UserProfile
