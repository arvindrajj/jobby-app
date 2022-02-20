import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {v4} from 'uuid'
import {
  BsFillStarFill,
  BsFillBriefcaseFill,
  BsBoxArrowUpRight,
} from 'react-icons/bs'
import {TiLocation} from 'react-icons/ti'
import Header from '../Header'
import SimilarJob from '../SimilarJob'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export default class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    skills: [],
    similarJobs: [],
    lifeAtCompany: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const jobsDetailsFormattedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const skillsFormattedData = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const lifeAtCompanyFormattedData = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const similarJobsData = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetails: jobsDetailsFormattedData,
        skills: skillsFormattedData,
        similarJobs: similarJobsData,
        lifeAtCompany: lifeAtCompanyFormattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryJobDetailsResources = () => {
    this.fetchJobDetails()
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryJobDetailsResources}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
    } = jobDetails
    return (
      <>
        <div className="header-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
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
        <div className="middle-container">
          <div className="location-internship-container">
            <TiLocation size="20" color="#ffffff" />
            <p className="location">{location}</p>
            <BsFillBriefcaseFill size="20" color="#ffffff" />
            <p className="employment-type">{employmentType}</p>
          </div>
          <p className="packagePerAnnum">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="description-and-company-link-container">
          <h1 className="description-heading">Description</h1>
          <a className="company-link-anchor-element" href={companyWebsiteUrl}>
            <p className="visit">Visit</p>
            <BsBoxArrowUpRight size="20" color="#4f46e5" />
          </a>
        </div>
        <p className="job-description">{jobDescription}</p>
      </>
    )
  }

  renderJobDetails = () => {
    const {skills, similarJobs, lifeAtCompany} = this.state
    console.log(similarJobs)
    return (
      <>
        <div className="jobDetails-container">
          {this.renderJobItemDetails()}
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(each => (
              <li className="skills-item" key={v4()}>
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skills-image"
                />
                <p className="skills-name">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-content">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(each => (
            <SimilarJob key={each.id} similarJobDetails={each} />
          ))}
        </ul>
      </>
    )
  }

  renderJobDetailsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-app-container">
          <div className="responsive-container">
            {this.renderJobDetailsList()}
          </div>
        </div>
      </>
    )
  }
}
