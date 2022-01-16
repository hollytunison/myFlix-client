import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER, REMOVE_USER } from "../actions/actions";

const visibilityFilter = (state = '', action) => {
    switch (action.type) {
        case SET_FILTER:
          console.log('setFilter reducer reached');
          return action.value;
            default:
                return state;
    }
}

const movies = (state = [], action) => {
    switch (action.type) {
      case SET_MOVIES:
        console.log('setMovies reducer reached');
        return action.value;
            default:
                return state;
    }
}

const users = (state = null, action) => {
  switch (action.type) {

    case SET_USER:
      console.log('setUser reducer reached');
      return {
        ...state,
        user: user
      }

case UPDATE_USER:
  console.log('updateUser reducer reached');
  return {
    ...state,
    user: {Username: Username,
    Password: Password,
    Email: Email,
    Birthday: Birthday}
  }

  case REMOVE_USER:
    console.log('removeUser reducer reached');
    // const newState = state.slice();
    // newState.splice(user);
    // alert(`${Username} has been removed.`);
    // return newState;

    return state.filter((userToRemove, index) => {
    if (userToRemove.Username === user.Username) {
    return false;
    }
    return true
    });

      default:
        return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  users
});

export default moviesApp;