import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from './apiAdmin'

const ManageProducts = () => {
  const [products, setProducts] = useState([])

  const { user, token } = isAuthenticated()

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        loadProducts()
      }
    })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <Layout
      title='Manager'
      description='Manage CRUD on products'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'> Total {products.length} products</h2>
          <ul className='list-group'>
            {products.map((product, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{product.name}</strong>
                <Link to={`/admin/product/update/${product._id}`}>
                  <span className='badge badge-warning badge-pill'>update</span>
                </Link>
                <span
                  onClick={() => destroy(product._id)}
                  className='badge badge-danger badge-pill'
                >
                  delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default ManageProducts
