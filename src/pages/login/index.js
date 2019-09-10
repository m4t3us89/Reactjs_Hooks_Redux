import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import './styles.css'
import Axios from '../../services/api'
// import { Container } from './styles';

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Component Login')
  }, [])

  async function login (event) {
    event.preventDefault()
    dispatch({ type: 'isLoading', message: 'Autenticando...' })
    try {
      const token = await Axios.post('user/authenticate', { email, password })
      console.log(token)
    } catch (err) {}

    dispatch({ type: 'notLoading' })
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
            onChange={event => setEmail(event.target.value)}
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
