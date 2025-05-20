import React from 'react'
import AdminNavbar from '../pages/AdminNavbar'
import { Outlet } from 'react-router-dom'

const AdminTemplate = () => {
  return (
    <>

    <div className='flex'>

        <AdminNavbar/>

        <Outlet/>
    </div>
    </>
  )
}

export default AdminTemplate