import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/login/'
import Page404 from './pages/http/404'
import Page401 from './pages/http/401'
import Home from './pages/home'
import isAuthenticated from './auth'

const PrivateRoute = ({ component: Componenet, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Componenet {...props} />
      ) : (
        <Redirect to={{ pathname: '/401', state: { from: props.locatiton } }} />
      )
    }
  />
)

export default function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <PrivateRoute exact path='/home' component={Home} />
        <Route path='/401' component={Page401} />
        <Route path='*' component={Page404} />
      </Switch>
    </BrowserRouter>
  )
}
