import HTTP from './'

export const fetchAllPosts = () => HTTP.get('/jobs');

export const addPost = (post) => HTTP.post('/jobs', post);

export const deletePost = (id) => HTTP.delete(`/jobs/${id}`);

export const fetchSinglePost = (id) => HTTP.get(`/jobs/${id}`);

export const updatePost = (id) => HTTP.put(`/jobs/update/${id}`);

