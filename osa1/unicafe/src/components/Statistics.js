import React from 'react'
import StatisticsLine from './StatisticsLine'

const Statistics = ({ good, bad, neutral }) => {
    const getTotal = () => good + bad + neutral

    const renderStats = () => {
        return (
            <table>
                <tbody>
                    <StatisticsLine text='good' value={good} />
                    <StatisticsLine text='neutral' value={neutral} />
                    <StatisticsLine text='bad' value={bad} />
                    <StatisticsLine text='all' value={getTotal()} />
                    <StatisticsLine text='average' value={(good - bad) / getTotal()} />
                    <StatisticsLine text='positive' value={good / getTotal() * 100} unit='%' />
                </tbody>
            </table>
        )
    }

    return (
        <div>
            {good + bad + neutral === 0 ?
            'No feedback given'
            :
            renderStats()}
        </div>
    )
}

export default Statistics