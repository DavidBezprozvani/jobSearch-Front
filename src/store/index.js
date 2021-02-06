import {configureStore} from "@reduxjs/toolkit"
import user, {loadUserFromStorage, subscribeToUserChanges} from "./slices/userSlice"


export const createStore = (initialState) => {
    const store = configureStore({
        reducer: {
            user
        },
        preloadedState: {user: loadUserFromStorage(), ...initialState}
    })

    subscribeToUserChanges(store);
    return store
}

export default createStore()