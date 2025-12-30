import React from 'react'
import SideBar from './Sidebar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div>
      <SideBar>
        <Outlet/>
      </SideBar>
    </div>
  )
}

export default AdminLayout;