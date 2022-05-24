const host = 'http://openlibrary.org';

export default {
  search: (data) => {
    const url = new URL('search.json', host);
    url.search = data.all ? new URLSearchParams({ q: data.all }) : null;
    return url;
  },
  advancedSearch: (data) => {
    const url = new URL('search.json', host);
    url.search = new URLSearchParams(data);
    return url;
  },
  fetchBook: (id) => {
    const url = new URL(`${id}.json`, host);
    return url;
  },
};
