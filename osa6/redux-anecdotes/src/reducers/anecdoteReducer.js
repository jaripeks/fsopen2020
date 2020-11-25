import anecdoteService from '../services/anecdotes'

const sortByVotes = state => {
  return(state.sort((a, b) => b.votes - a.votes))
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return sortByVotes(state.concat(action.data))
    case 'VOTE':
      const id = action.data.id
      return sortByVotes(state.map(anecdote => anecdote.id !== id ? anecdote : action.data))
    case 'INIT_ANECDOTES':
      return sortByVotes(action.data)
    default: return sortByVotes(state)
  }
}

export const voteAnecdote = anecdote => {
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  return async dispatch => {
    const updatedAnectdote = await anecdoteService.update(anecdote.id, changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnectdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew({ content, votes: 0 })
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  } 
}

export default anecdoteReducer