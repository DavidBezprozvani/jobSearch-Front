import {configureStore} from "@reduxjs/toolkit"
import user, {loadUserFromStorage} from "./slices/userSlice"


export const createStore = (initialState) => {
    const store = configureStore({
        reducer: {
            user
        },
        preloadedState: {user: loadUserFromStorage(), ...initialState}
    })

    return store
}

export default createStore()