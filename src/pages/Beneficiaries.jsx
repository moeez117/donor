import React from 'react'
import BeneficiariesList from '../components/beneficiaries/BeneficiariesList'
import SandiSyncStatus from '../components/beneficiaries/SandiSyncStatus'
import AidDistributionMap from '../components/beneficiaries/AidDistributionMap'

const Beneficiaries = () => {
  return (
    <div>
        <BeneficiariesList/>
        <SandiSyncStatus/>
        <AidDistributionMap/>
    </div>
  )
}

export default Beneficiaries