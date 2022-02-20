import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = props => {
  const {selectedEmploymentType, selectedSalaryRange} = props

  const onSelectedEmploymentType = event => {
    if (event.target.checked) {
      selectedEmploymentType(event.target.value)
    } else {
      selectedEmploymentType(event.target.value)
    }
  }

  const onSelectedSalaryRange = event => {
    if (event.target.checked) {
      selectedSalaryRange(event.target.value)
    }
  }
  return (
    <div className="filters-app-container">
      <hr className="line" />
      <h1 className="filters-heading">Type of Employment</h1>
      <ul className="filters-list-container">
        {employmentTypesList.map(each => (
          <li className="list-item" key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              className="checkbox"
              onChange={onSelectedEmploymentType}
            />
            <label htmlFor={each.employmentTypeId} className="label-txt">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="line" />
      <h1 className="filters-heading">Salary Range</h1>
      <ul className="filters-list-container">
        {salaryRangesList.map(each => (
          <li className="list-item" key={each.salaryRangeId}>
            <input
              type="radio"
              id={each.salaryRangeId}
              className="radio"
              name="salaryRange"
              value={each.salaryRangeId}
              onChange={onSelectedSalaryRange}
            />
            <label htmlFor={each.salaryRangeId} className="label-txt">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FiltersGroup
