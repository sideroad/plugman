import config from './config';
import uris from './uris';

const base = config.global.base;

export default {
  user: {
    save: {
      url: `${base}/bff${uris.apis.users}`,
      method: 'POST',
      credentials: 'include',
    },
  },
  plug: {
    gets: {
      url: `${base}/bff${uris.apis.plugs}`,
      method: 'GET',
      defaults: {
        limit: 10000,
        orderBy: 'name'
      },
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
  message: {
    gets: {
      url: `${base}/bff/apis/plugman/messages`,
      method: 'GET',
      defaults: {
        limit: 10000
      },
      credentials: 'include'
    },
    bulkSave: {
      url: `${base}/bff/apis/plugman/messages`,
      method: 'PATCH',
      credentials: 'include',
    },
    delete: {
      url: `${base}/bff/apis/plugman/messages/:message`,
      method: 'DELETE',
      defaults: {
        limit: 10000
      },
      credentials: 'include'
    },
    deletes: {
      url: `${base}/bff/apis/plugman/messages`,
      method: 'DELETE',
      defaults: {
        limit: 10000
      },
      credentials: 'include'
    }
  }
};
