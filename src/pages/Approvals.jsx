import React from 'react'
import Accept from '../components/Approval/Accept'
import ApprovalList from '../components/Approval/ApprovalList'
import ApprovalCard from '../components/Approval/ApprovalCard'

const Approvals = () => {
  return (
    <div>
        <Accept/>
        <ApprovalList/>
        <ApprovalCard/>
    </div>
  )
}

export default Approvals