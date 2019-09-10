import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from 'react-spinkit'
import './styles.css'

export default function Loading () {
  const reduxLoading = useSelector(state => state.isLoading)
  const reduxMessage = useSelector(state => state.message)

  return reduxLoading ? (
    <div className='overlay-content'>
      <div className='wrapper'>
        <Spinner name='ball-grid-pulse' fadeIn='none' color='gray' />
        <span className='message'>{reduxMessage}</span>
      </div>
    </div>
  ) : null
}
