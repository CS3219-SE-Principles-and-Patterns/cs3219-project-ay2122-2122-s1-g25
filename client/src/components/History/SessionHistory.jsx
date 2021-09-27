import React from 'react'

import { Divider } from '@material-ui/core'

export default function sessionHistory() {
  return (
    <div className="history-box">
      <div className="history-box-left">
        <div className="history-box-difficulty">Hard</div>
        <div className="history-box-date">15 Sep 2021</div>
        <div className="history-box-time">10.34pm - 11.15pm</div>
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="history-box-right">
        <div className="history-box-partner">Praticed with jiahua!</div>
        <ol>
          <li>Two Sum</li>
          <li>Maximum Subarray</li>
        </ol>
      </div>
    </div>
  )
}
