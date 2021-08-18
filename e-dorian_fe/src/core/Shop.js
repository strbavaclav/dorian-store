import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories, getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import { prices } from './fixedPrices'

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)
  const [limit] = useState(6)
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(0)
  const [filteredResults, setfilteredResults] = useState([])
  const [run] = useState(false)

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error)
        console.log(error)
      } else {
        setCategories(data)
      }
    })
  }

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setfilteredResults(data.data)
        setSize(data.size)
        setSkip(0)
      }
    })
  }

  const loadMore = () => {
    let toSkip = skip + limit
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setfilteredResults([...filteredResults, ...data.data])
        setSize(data.size)
        setSkip(toSkip)
      }
    })
  }

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className='btn btn-warning mb-5'>
          Více...
        </button>
      )
    )
  }

  useEffect(() => {
    init()
    loadFilteredResults(skip, limit, myFilters.filters)
  }, [run])

  const handleFilters = (filters, filterBy) => {
    //console.log('SHOP', filters, filterBy)
    const newFilters = { ...myFilters }
    newFilters.filters[filterBy] = filters

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    }
    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters)
  }

  const handlePrice = (value) => {
    const data = prices
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }
    return array
  }

  return (
    <Layout title='SHOP' description='this is shop' className='container-fluid'>
      <div className='row'>
        <div className='col-2'>
          <h4>Kategorie</h4>
          <ul className='mr-2 ml-5'>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, 'category')}
            />
          </ul>
          <h4>Cena</h4>
          <ul>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, 'price')}
            />
          </ul>
        </div>
        <div className='col-8'>
          <div className='row'>
            {filteredResults.map((product, i) => (
              <div key={i} className='col-4 mb-3'>
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  )
}

export default Shop
