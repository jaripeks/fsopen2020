import React from 'react'

const Total = ({ course }) => {
    const total = course.parts.map(part => part.exercises)
    const reducer = (acc, current) => acc + current

    return (
        <p>
            <b>total of {total.reduce(reducer)} exercises</b>
        </p>
    )
}

export default Total