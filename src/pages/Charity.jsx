import React from 'react'
import CharityDirectory from '../components/charity/CharityDirectory'
import CharityPerformance from '../components/charity/CharityPerformance'
import LicensesDocuments from '../components/charity/LicensesDocuments'
import RegistrationRequests from '../components/charity/RegistrationRequests'

const Charity = () => {
  return (
    <div>
      <CharityDirectory/>
      <CharityPerformance/>
      <LicensesDocuments/>
      <RegistrationRequests/>
    </div>
  )
}

export default Charity