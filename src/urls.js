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
  favorite: {
    gets: {
      url: `${base}/bff/apis/plugman/favorites`,
      method: 'GET',
      defaults: {
        limit: 10000
      },
      credentials: 'include'
    },
    add: {
      url: `${base}/bff/apis/plugman/favorites`,
      method: 'POST',
      credentials: 'include',
    },
    update: {
      url: `${base}/bff/apis/plugman/favorites/:favorite`,
      method: 'PATCH',
      credentials: 'include',
    },
    delete: {
      url: `${base}/bff/apis/plugman/favorites/:favorite`,
      method: 'DELETE',
      credentials: 'include'
    },
    deletes: {
      url: `${base}/bff/apis/plugman/favorites`,
      method: 'DELETE',
      credentials: 'include'
    }
  }
};
