const host = 'https://openlibrary.org';

export default {
  search: (searchParams) => {
    const url = new URL('search.json', host);
    url.search = new URLSearchParams(searchParams);
    return url;
  },
  fetchBook: (id) => {
    const url = new URL(`${id}.json`, host);
    return url;
  },
};
