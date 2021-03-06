import React, { useState} from 'react'

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([])

  const handleToggle = category => () => {
    const currentCategoryId = checked.indexOf(category) //return the first index or -1
    const newCheckedCategoryId = [...checked]
    //if currently checked was not already in checked state > push
    //else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(category)
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)
  }

  return categories.map((category, i) => (
    <li key={i} className='list-unstyled'>
      <input
        onChange={handleToggle(category._id)}
        value={checked.indexOf(category._id === -1)}
        type='checkbox'
        className='form-check-input'
      />
      <label className='form-check-label'>{category.name}</label>
    </li>
  ))
}
export default Checkbox
