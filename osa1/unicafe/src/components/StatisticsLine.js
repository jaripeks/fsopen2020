import React from 'react'

const StatisticsLine = ({ text, value, unit }) => <tr><td>{text}</td><td>{value} {unit}</td></tr>

export default StatisticsLine