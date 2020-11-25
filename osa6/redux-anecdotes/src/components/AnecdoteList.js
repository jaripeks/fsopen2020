import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = props => {
    /*     
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if(filter === '') {
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    })
    
    const dispatch = useDispatch()
    */

    const handleVote = anecdote => {
        props.voteAnecdote(anecdote)
        props.setNotification(`you voted '${anecdote.content}'`, 5)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => handleVote(anecdote)}
                />
            )}
        </div>
    )
}

const mapStateToProps = state => {
    if(state.filter === '') {
        return {
            anecdotes: state.anecdotes
        }
    }
    return {
        anecdotes: state.anecdotes
            .filter(anecdote => {
                return anecdote.content
                    .toLocaleLowerCase()
                    .includes(state.filter.toLocaleLowerCase())
            })
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList