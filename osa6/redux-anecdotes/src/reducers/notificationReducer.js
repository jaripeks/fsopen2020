const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
}

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
        dispatch({
            type: 'SET_NOTIFICATION',
            notification: {
                message,
                style
            }
        })
        setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, timeout * 1000);
    }
}



export default notificationReducer