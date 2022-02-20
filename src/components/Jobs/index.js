import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import UserProfile from '../UserProfile'
import JobItem from '../JobItem'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export default class Jobs extends Component {
  state = {
    profileDetails: {},
    jobsList: [],
    searchInput: '',
    userApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
    employmentTypeIdList: [],
    salaryRangeId: '',
  }

  componentDidMount() {
    this.fetchUserDetails()
    this.fetchJobs()
  }

  fetchUserDetails = async () => {
    this.setState({userApiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
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
      const userFormattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: userFormattedData,
        userApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({userApiStatus: apiStatusConstants.failure})
    }
  }

  fetchJobs = async () => {
    const {searchInput, employmentTypeIdList, salaryRangeId} = this.state
    const employmentTypes = employmentTypeIdList.join(',')
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${salaryRangeId}&search=${searchInput}`
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
      const jobsFormattedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: jobsFormattedData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderUserLoader = () => (
    <div className="loader-user-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryJobsResources = () => {
    this.fetchJobs()
  }

  onRetryUserResources = () => {
    this.fetchUserDetails()
  }

  renderJobsFailureView = () => (
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
        onClick={this.onRetryJobsResources}
      >
        Retry
      </button>
    </div>
  )

  renderUserFailureView = () => (
    <div className="user-error-view-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryUserResources}
      >
        Retry
      </button>
    </div>
  )

  renderUserDetails = () => {
    const {profileDetails} = this.state
    return <UserProfile profileDetails={profileDetails} />
  }

  renderUserDetailsList = () => {
    const {userApiStatus} = this.state
    switch (userApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderUserLoader()
      case apiStatusConstants.success:
        return this.renderUserDetails()
      case apiStatusConstants.failure:
        return this.renderUserFailureView()
      default:
        return null
    }
  }

  renderJobs = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-item-container">
        {jobsList.map(each => (
          <JobItem key={each.id} jobDetails={each} />
        ))}
      </ul>
    )
  }

  renderJobsList = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobs()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.fetchJobs()
    }
  }

  searchResult = () => {
    this.fetchJobs()
  }

  selectedEmploymentType = employmentTypeId => {
    const {employmentTypeIdList} = this.state
    if (employmentTypeIdList.includes(employmentTypeId)) {
      const index = employmentTypeIdList.indexOf(employmentTypeId)
      employmentTypeIdList.splice(index, 1)
      this.setState({employmentTypeIdList}, this.fetchJobs)
    } else {
      this.setState(
        prevState => ({
          employmentTypeIdList: [
            ...prevState.employmentTypeIdList,
            employmentTypeId,
          ],
        }),
        this.fetchJobs,
      )
    }
  }

  selectedSalaryRange = salaryRangeId => {
    this.setState({salaryRangeId}, this.fetchJobs)
  }

  render() {
    const {searchInput, jobsList, jobsApiStatus} = this.state
    let showJobsList = null
    if (jobsApiStatus === 'INITIAL' || jobsApiStatus === 'IN_PROGRESS') {
      showJobsList = true
    } else if (jobsList.length > 0) {
      showJobsList = true
    } else if (jobsApiStatus !== 'FAILURE') {
      showJobsList = false
    } else {
      showJobsList = true
    }
    return (
      <>
        <Header />
        <div className="jobs-app-container">
          <div className="responsive-container">
            <div className="user-and-filters-container">
              <div className="user-container">
                {this.renderUserDetailsList()}
              </div>
              <FiltersGroup
                selectedEmploymentType={this.selectedEmploymentType}
                selectedSalaryRange={this.selectedSalaryRange}
              />
            </div>
            <div className="jobs-list-container">
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="input"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-button"
                  onClick={this.searchResult}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {showJobsList ? (
                this.renderJobsList()
              ) : (
                <div className="no-jobs-view">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                    className="no-jobs-img"
                    alt="no jobs"
                  />
                  <h1 className="no-jobs-heading">No Jobs Found</h1>
                  <p className="no-jobs-description">
                    We could not find any jobs. Try other filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}
