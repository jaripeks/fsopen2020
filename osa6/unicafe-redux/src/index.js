import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const getTotal = () => store.getState().good + store.getState().ok + store.getState().bad
  
  const getAverage = () => {
    return(
      <div>
        average {getTotal() === 0 ?
          0
          :
          (store.getState().good - store.getState().bad) / getTotal()
        }
      </div>
    )
  }
  
  const getPositive = () => {
    return(
      <div>
        positive {getTotal() === 0 ?
          0
          :
          store.getState().good / getTotal() * 100
        } %
      </div>
    )
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <button onClick={good}>good</button>
        <button onClick={ok}>neutral</button>
        <button onClick={bad}>bad</button>
        <button onClick={reset}>reset stats</button>
        <div>good {store.getState().good}</div>
        <div>neutral {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
      <div>
        <h1>statistics</h1>
        <div>all {getTotal()}</div>
        {getAverage()}
        {getPositive()}
      </div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
