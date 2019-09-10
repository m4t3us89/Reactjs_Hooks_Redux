import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/login/'
import Page404 from './pages/http/404'

export default function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/sobre' component={null} />
        <Route path='*' component={Page404} />
      </Switch>
    </BrowserRouter>
  )
}
