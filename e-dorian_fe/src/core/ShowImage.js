import React from 'react'
import { API } from '../config'

const ShowImage = ({ item, url }) => (
  <div className='product-img' style={{justifyContent:'center', alignItems:'center'}}>
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className='mb-3'
      style={{ maxHeight: '200px', maxWidth: '100%' }}
    />
  </div>
)

export default ShowImage
