import React from 'react'
import DonationOverview from '../components/donation/DonationOveriew'
import PaymentChannels from '../components/donation/PaymentChannels'
import RefundsDisputes from '../components/donation/RefundsDisputes'

// import DonationList from '../components/donation/DonationList'

const Donations = () => {
  return (
    <div>
        <DonationOverview/>
        <PaymentChannels/>
        <RefundsDisputes/>
    </div>
  )
}

export default Donations