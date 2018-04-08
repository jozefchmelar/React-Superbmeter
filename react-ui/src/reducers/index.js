import { combineReducers } from 'redux'

const myApp = combineReducers({
    cities
})


const initState = {
    from: '',
    to: '',
    distance: 0.0
}

function cities(state, action) {
    return initState
  
    if (typeof state === 'undefined')
        return {
            from: '',
            to: '',
            distance: 0.0
        }

    switch (action.type) {
        case 'Kam':
            return { ...state, from: action.location }
        case 'Odkial':
            return { ...state, to: action.location }
        case 'Distance':
            return { ...state, distance: action.distance }
        default:
            return state
    }
}

export default myApp
