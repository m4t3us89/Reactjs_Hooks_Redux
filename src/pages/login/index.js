import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import './styles.css'
// import { Container } from './styles';

export default function Login () {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Component Login')
  }, [])

  function login (event) {
    event.preventDefault()
    dispatch({ type: 'isLoading', message: 'Autenticando...' })
    console.log(user, password)
    setTimeout(function () {
      dispatch({ type: 'notLoading' })
    }, 1000)
  }

  return (
    <div className='login'>
      <div />
      <Form onSubmit={login}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            onChange={event => setUser(event.target.value)}
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
