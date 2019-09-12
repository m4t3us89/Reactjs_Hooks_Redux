import React, { useEffect } from 'react'
import Axios from '../../services/api'
// import { Container } from './styles';

export default function Home () {
  useEffect(() => {
    loadTodo()
  })

  async function loadTodo () {
    try {
      const todos = await Axios.get('/todo')
      console.log(todos)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <>
      <h6>Home</h6>
    </>
  )
}
