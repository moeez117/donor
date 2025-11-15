import React from 'react'
import ComplianceOverview from '../components/compliance/ComplianceOverview'
import ComplianceList from '../components/compliance/ComplianceList'
import RulesThresholds from '../components/compliance/RulesThresholds'

const Compliance = () => {
  return (
    <div>
        <ComplianceOverview/>
        <ComplianceList/>
        <RulesThresholds/>
    </div>
  )
}

export default Compliance