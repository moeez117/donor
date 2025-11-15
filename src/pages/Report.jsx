import React from 'react'
import ReportsKPI from '../components/report/ReportsKPI'
import ScheduledReports from '../components/report/ScheduledReports'
import ExportsPanel from '../components/report/ExportsPanel'

const Report = () => {
  return (
    <div>
        <ReportsKPI/>
        <ScheduledReports/>
        <ExportsPanel/>
    </div>
  )
}

export default Report