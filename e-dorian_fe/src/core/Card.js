import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem, updateItem } from './Cart/cartHelpers'
import { removeItem } from './Cart/cartHelpers'

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
            Detail
          </button>
        </Link>
      )
    )
  }
  const handleChange = (productId) => (event) => {
    setRun(!run)
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>Adjust quantity</span>
          </div>
          <input
            type='number'
            className='form-control'
            value={count}
            onChange={handleChange(product._id)}
          />
        </div>
      )
    )
  }
  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className='btn btn-outline-warning mt-2 mb-2'
        >
          Koupit
        </button>
      )
    )
  }
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id)
            setRun(!run)
          }}
          className='btn btn-outline-danger mt-2 mb-2'
        >
          Odebrat
        </button>
      )
    )
  }
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  }

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />
    }
  }

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>Na skladě</span>
    ) : (
      <span className='badge badge-primary badge-pill'>Vyprodáno</span>
    )
  }
  return (
    <div className='card'>
      <div className='card-header name>'>{product.name}</div>
      <div className='card-body'>
        {shouldRedirect(redirect)}
        <ShowImage item={product} url='product' />
        <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
        <p className='black-10'>{product.price} Kč</p>
        <p className='black-9'>
          Kategorie: {product.category && product.category.name}
        </p>
        <p className='black-8'>Přidáno {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br />

        {showViewButton(showViewProductButton)}

        {showAddToCart(showAddToCartButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  )
}

export default Card
