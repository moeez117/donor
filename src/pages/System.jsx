import React from 'react'
import AdminUsersRoles from '../components/system/AdminUsersRoles'
import AccessControlMatrix from '../components/system/AccessControlMatrix'
import AdminSettings from '../components/system/AdminSettings'
import SystemActivityLogs from '../components/system/SystemActivityLogs'

const System = () => {
  return (
    <div>
          <AdminUsersRoles />
      <AccessControlMatrix />
      <AdminSettings />
      <SystemActivityLogs />
    </div>
  )
}

export default System