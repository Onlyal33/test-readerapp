import axios from 'axios';

import routes from './routes.js';

const searchAPI = {
  fetchItemById: async (id) => axios.get(routes.fetchBook(id)),
  search: async (searchParams) => axios.get(routes.search(searchParams)),
};

export default searchAPI;
