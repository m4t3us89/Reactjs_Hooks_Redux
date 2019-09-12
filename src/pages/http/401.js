import React from 'react'
import { Button } from 'react-bootstrap'
// import { Container } from './styles';

export default function Page401 (props) {
  return (
    <>
      <h6>Sem autorização</h6>

      <Button variant='primary' onClick={() => props.history.push('/')}>
        Login
      </Button>
    </>
  )
}
