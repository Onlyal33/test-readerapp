const host = 'http://openlibrary.org';

export default {
  search: (data) => {
    const url = new URL('search.json', host);
    url.search = new URLSearchParams(data);
    return url;
  },
  fetchBook: (id) => {
    const url = new URL(`${id}.json`, host);
    return url;
  },
};
