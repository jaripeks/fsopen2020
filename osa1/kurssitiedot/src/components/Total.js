import React from 'react'

const Total = ({ course }) => {
    const total = course.parts.map(part => part.exercises)
    const reducer = (acc, current) => acc + current

    return (
        <p>
            Number of exercises {total.reduce(reducer)}
        </p>
    )
}

export default Total