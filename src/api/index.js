import React from 'react';
import axios from 'axios';


const HTTP = axios.create({
    baseURL: '/'
})

export {HTTP as default}