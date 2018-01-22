import { normalize, proxy, stringify } from 'koiki';
import config from '../config';
import uris from '../uris';

const apiBase = normalize(`${config.api.host}:${config.api.port}`);

export default function bffFn(app) {
  const headers = {
    host: config.api.host,
    'content-type': 'application/json',
    'x-chaus-client': config.chaus.client,
    'x-chaus-secret': config.chaus.secret
  };

  const confirmPlugPermission = (req) => {
    const uri = stringify(uris.apis.plug, {
      plug: req.params.plug
    });
    fetch(`${apiBase}${uri}`, {
      method: 'GET',
      headers,
    })
      .then(fetched => fetched.json())
      .then(json => (
        json.owner.id === req.user.id ?
          Promise.resolve() :
          Promise.reject()
      ));
  };

  proxy({
    app,
    protocol: 'https',
    host: config.api.host,
    prefix: '/bff',
    before: (url, options, cb) => cb([url, {
      method: options.method,
      headers,
      body: options.body
    }]),
    customizer: {
      [uris.apis.users]: {
        POST: {
          override: (req, res) => {
            fetch(`${apiBase}${uris.apis.users}`, {
              method: 'POST',
              headers,
              body: {
                gid: req.user.id,
              }
            }).then(() => {}, () => {})
              .then(() => res.json({}));
          },
        }
      },
      [uris.apis.plugs]: {
        GET: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            fetch(`${apiBase}${uris.apis.plugs}?owner=${req.user.id}`, {
              method: 'GET',
              headers,
            }).then(fetched => fetched.json())
              .then(json => res.json(json));
          },
        },
        POST: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            fetch(`${apiBase}${uris.apis.plugs}`, {
              method: 'POST',
              headers,
              body: {
                ...req.body,
                owner: req.user.id,
              },
            }).then(fetched => fetched.json())
              .then(json => res.json(json));
          },
        },
      },
      [uris.apis.plug]: {
        PATCH: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            confirmPlugPermission(req)
              .then(() => {
                const uri = stringify(uris.apis.plug, {
                  plug: req.params.plug
                });
                fetch(`${apiBase}${uri}`, {
                  method: 'PATCH',
                  headers,
                  body: {
                    ...req.body,
                    owner: req.user.id,
                  },
                }).then(fetched => fetched.json())
                  .then(json => res.json(json));
              }, () => res.status(401).json({}));
          },
        },
        DELETE: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            confirmPlugPermission(req)
              .then(() => {
                const uri = stringify(uris.apis.plug, {
                  plug: req.params.plug
                });
                fetch(`${apiBase}${uri}`, {
                  method: 'DELETE',
                  headers,
                  body: {
                    ...req.body,
                    owner: req.user.id,
                  },
                }).then(fetched => fetched.json())
                  .then(json => res.json(json));
              }, () => res.status(401).json({}));
          },
        },
      },
    },
  });
}
