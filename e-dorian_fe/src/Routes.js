import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import Profile from './user/Profile'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import UpdateProduct from './admin/UpdateProduct'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import Shop from './core/Shop'
import Menu from './core/Menu'
import Footer from './core/footer/Footer'
import Product from './core/Product'
import Cart from './core/Cart/Cart'
import Orders from './admin/Orders'
import ManageProducts from './admin/ManageProducts'

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/shop' exact component={Shop} />
        <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
        <PrivateRoute path='/profile/:userId' exact component={Profile} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <AdminRoute path='/create/category' exact component={AddCategory} />
        <AdminRoute path='/create/product' exact component={AddProduct} />
        <AdminRoute
          path='/admin/product/update/:productId'
          exact
          component={UpdateProduct}
        />
        <AdminRoute path='/admin/orders' exact component={Orders} />
        <AdminRoute path='/admin/products' exact component={ManageProducts} />
        <Route path='/product/:productId' exact component={Product} />
        <Route path='/cart' exact component={Cart} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default Routes
