import React from 'react'
import { Button } from 'react-bootstrap'
// import {} from 'react-icons/fa'

// import { Container } from './styles';

export default function Page404 (props) {
  return (
    <>
      <h3>Página não encontrada.</h3>
      <Button variant='primary' onClick={() => props.history.push('/home')}>
        Página Inicial
      </Button>
    </>
  )
}
