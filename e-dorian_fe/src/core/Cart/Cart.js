import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { getCart } from './cartHelpers'
import { Link } from 'react-router-dom'
import Card from '../Card'
import Checkout from './Checkout'

const Cart = () => {
  const [items, setItems] = useState([])
  const [run, setRun] = useState(false)

  useEffect(() => {
    setItems(getCart())
  }, [run])

  const showItems = (items) => {
    return (
      <div>
        <h2>{`${items.length}`} je v košíku</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    )
  }

  const noItemsMessage = () => (
    <h2>
      Tvůj košík je prázdný! <Link to='/shop'>Zpátky do ochodu...</Link>
    </h2>
  )
  return (
    <Layout
      title='Košík'
      description='TOto je tvůj košík'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-6'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className='col-6'>
          <h2>Přehled košíku</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  )
}

export default Cart
