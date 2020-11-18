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

export const setNotification = message => {
    return {
        type: 'SET_NOTIFICATION',
        notification: {
            message,
            style
        }
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
    }
}

export default notificationReducer