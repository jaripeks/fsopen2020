import React from 'react'

const Content = ({ course }) => {
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
    return (
        <div>
            {course.parts.map(part => <Part part={part} key={part.name+part.exercises} />)}
        </div>
    )
}

export default Content