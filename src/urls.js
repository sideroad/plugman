import config from './config';
import uris from './uris';

const base = config.global.base;

export default {
  plug: {
    gets: {
      url: `${base}/bff${uris.apis.plugs}`,
      method: 'GET',
      credentials: 'include'
    },
    add: {
      url: `${base}/bff${uris.apis.plugs}`,
      method: 'POST',
      credentials: 'include'
    },
    update: {
      url: `${base}/bff${uris.apis.plug}`,
      method: 'PATCH',
      credentials: 'include'
    },
    delete: {
      url: `${base}/bff${uris.apis.plug}`,
      method: 'DELETE',
      credentials: 'include'
    }
  },
  keepalive: {
    get: {
      url: `${base}/bff${uris.apis.keepalive}`,
      method: 'GET',
      credentials: 'include'
    },
    update: {
      url: `${base}/bff${uris.apis.keepalive}`,
      method: 'PATCH',
      credentials: 'include'
    }
  },
  favorite: {
    gets: {
      url: `${base}/bff${uris.apis.favorites}`,
      method: 'GET',
      defaults: {
        limit: 10000
      },
      credentials: 'include'
    },
    add: {
      url: `${base}/bff${uris.apis.favorites}`,
      method: 'POST',
      credentials: 'include'
    },
    update: {
      url: `${base}/bff${uris.apis.favorite}`,
      method: 'PATCH',
      credentials: 'include'
    },
    delete: {
      url: `${base}/bff${uris.apis.favorite}`,
      method: 'DELETE',
      credentials: 'include'
    },
    deletes: {
      url: `${base}/bff${uris.apis.favorites}`,
      method: 'DELETE',
      credentials: 'include'
    }
  }
};
