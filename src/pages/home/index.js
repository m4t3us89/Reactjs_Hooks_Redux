import React, { useState, useEffect } from 'react'
import Axios from '../../services/api'
// import { Container } from './styles';

export default function Home () {
  const [todo, setTodo] = useState([])

  useEffect(() => {
    loadTodo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadTodo () {
    try {
      const { data: todos } = await Axios.get('/todo')
      setTodo(todos)
      console.log(todo)
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
