export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const REMOVE_USER = 'REMOVE_USER';

export function setMovies(value) {
    console.log('setMovies triggered');
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    console.log('setFilter triggered');
    return { type: SET_FILTER, value };
}

export function setUser(value) {
    console.log('setUser triggered');
    return { type: SET_USER, value };
}

export function updateUser(value) {
    console.log('updateUser triggered');
    return { type: UPDATE_USER, value };
}

export function removeUser(value) {
    console.log('removeUsertriggered');
    return { type: REMOVE_USER, value };
}