import React, { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import isAuthenticated from '../../auth'
import './styles.css'
import Axios from '../../services/api'
// import { Container } from './styles';

export default function Login (props) {
  const [email, setEmail] = useState('allissonmateus89@gmail.com')
  const [password, setPassword] = useState('realmadri89')
  const [alert, setAlert] = useState({ show: false })
  const dispatch = useDispatch()

  useEffect(() => {
    redirectIfAuthenticated()
  })

  function redirectIfAuthenticated () {
    if (isAuthenticated()) props.history.push('/home')
  }

  async function login (event) {
    event.preventDefault()
    setAlert({ show: false })
    dispatch({ type: 'isLoading', message: 'Autenticando...' })
    try {
      const { data: credentials } = await Axios.post('user/authenticate', {
        email,
        password
      })
      localStorage.setItem('credentials', JSON.stringify(credentials))
      props.history.push('/home')
    } catch (err) {
      // if (Array.isArray(err.response.data)) setAlert(err.response.data)
      // console.log(err.response.data)
      setAlert({
        show: true,
        variant: 'danger',
        ...(err.response ? err.response.data[0] : { message: 'Erro' })
      })
    }

    // setTimeout(() => dispatch({ type: 'notLoading' }), 2000)
    dispatch({ type: 'notLoading' })
  }

  return (
    <div className='login'>
      <Alert
        show={alert.show}
        variant={alert.variant}
        onClose={() => setAlert({ show: false })}
        dismissible
      >
        <p>{alert.message}</p>
      </Alert>
      <Form onSubmit={login}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            onChange={event => setEmail(event.target.value)}
            value={email}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
        </Form.Group>
        <Form.Group controlId='formBasicChecbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}
