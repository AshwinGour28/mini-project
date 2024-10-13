import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SearchFlight from './pages/SearchFlight'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import AddPassenger from './pages/AddPassenger'
import OnlyAdminPrivateRoute from './pages/OnlyAdminPrivateRoute'
import AddAdmin from './pages/AddAdmin'
import AddFlight from './pages/AddFlight'
import UpdateFlight from './pages/UpdateFlight'
import DeleteFlight from './pages/DeleteFlight'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/searchflights" element={<SearchFlight />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/add-passenger' element={<AddPassenger />}/>
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/add-admin' element={<AddAdmin />} />
          <Route path='/add-flight' element={<AddFlight />} />
          <Route path='/update-flight' element={<UpdateFlight />} />
          <Route path='/delete-flight' element={<DeleteFlight />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
