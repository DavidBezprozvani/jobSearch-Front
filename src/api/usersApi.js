import HTTP from './'

export const login = (userLogin) => HTTP.post("/login", userLogin)