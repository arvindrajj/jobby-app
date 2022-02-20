import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {TiLocation} from 'react-icons/ti'

import './index.css'

const SimilarJob = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="job-details-item">
      <div className="header-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-image"
        />
        <div className="title-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <BsFillStarFill size="20" color="#fbbf24" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-internship-container">
        <TiLocation size="20" color="#ffffff" />
        <p className="location">{location}</p>
        <BsFillBriefcaseFill size="20" color="#ffffff" />
        <p className="employment-type">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJob
