import HTTP from './'

export const login = (userLogin) => HTTP.post("/login", userLogin);

export const saveUser = (user) => HTTP.post("/users", user);

export const fetchAllUsers = () => HTTP.get('/users');

export const fetchUserById = (id) => HTTP.get("/users/" + id);