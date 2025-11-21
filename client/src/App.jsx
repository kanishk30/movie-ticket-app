import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {


  return (
    <>

    <h2>Movie Tickets</h2>

    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
