import axios from 'axios';

axios.defaults.baseURL = 'https://dj-r-f-api-moments.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true