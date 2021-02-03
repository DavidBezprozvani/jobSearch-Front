import HTTP from './'

export const fetchAllCompanies = () => HTTP.get('/companies');

export const addCompany = (company) => HTTP.post('/companies', company);

export const deleteCompany = (id) => HTTP.delete(`/companies/${id}`);

export const updateCompany = (id) => HTTP.put(`/companies/${id}`);

export const fetchSingleCompany = (id) => HTTP.get(`/companies/${id}`)