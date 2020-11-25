const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
}

let timeOutId = undefined

const notificationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'CLEAR_NOTIFICATION':
            return {}
        default: return state
    }
}


export const setNotification = (message, timeout) => {
    return async dispatch => {
        // from docs: 'Passing an invalid ID to clearTimeout() silently does nothing; no exception is thrown.'
        if(timeOutId !== undefined) {
            clearTimeout(timeOutId)
        }

        dispatch({
            type: 'SET_NOTIFICATION',
            notification: {
                message,
                style
            }
        })
        
        timeOutId = setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, timeout * 1000);
    }
}



export default notificationReducer