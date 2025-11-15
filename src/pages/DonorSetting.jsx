import React from 'react'
import DonorProfileProfile from '../components/donor/setting/DonorProfileProfile'
import DonorProfileSecurity from '../components/donor/setting/DonorProfileSecurity'
import DonorProfilePreferences from '../components/donor/setting/DonorProfilePreferences'

const DonorSetting = () => {
  return (
    <div>
        <DonorProfileProfile/>
        <DonorProfileSecurity/>
        <DonorProfilePreferences/>
    </div>
  )
}

export default DonorSetting