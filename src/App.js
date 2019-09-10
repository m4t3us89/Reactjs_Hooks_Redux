import React from 'react'
import Routes from './routes'
import Header from './components/header'
import Footer from './components/footer'
import Loading from './components/loading'
import { Provider } from 'react-redux'
import store from './store'

function App () {
  return (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <main className='content'>
          <Routes />
          <Loading />
        </main>
        <Footer />
      </div>
    </Provider>
  )
}

export default App
