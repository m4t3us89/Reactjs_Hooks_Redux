import React from 'react'
import { useSelector } from 'react-redux'
import Lottie from 'react-lottie'
import * as animationData from '../../lottiefiles/rocket.json'
import './styles.css'

export default function Loading () {
  const reduxLoading = useSelector(state => state.isLoading)
  const reduxMessage = useSelector(state => state.message)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default
  }
  //        <Spinner name='ball-grid-pulse' fadeIn='none' color='gray' />

  return reduxLoading ? (
    <div className='overlay-content'>
      <div className='wrapper'>
        <Lottie options={defaultOptions} height={150} width={150} />
        <span className='message'>{reduxMessage}</span>
      </div>
    </div>
  ) : null
}
