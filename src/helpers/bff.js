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

  const confirmPermission = (resource, req) => {
    const uri = stringify(uris.apis[resource], {
      [resource]: req.params[resource]
    });
    return fetch(`${apiBase}${uri}`, {
      method: 'GET',
      headers
    })
      .then(fetched => fetched.json())
      .then(json => (json.owner === req.user.id ? Promise.resolve() : Promise.reject()));
  };

  proxy({
    app,
    protocol: 'https',
    host: config.api.host,
    prefix: '/bff',
    customizer: {
      [`/bff${uris.apis.plugs}`]: {
        GET: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            fetch(`${apiBase}${uris.apis.plugs}?owner=${req.user.id}&limit=10000&orderBy=name`, {
              method: 'GET',
              headers
            })
              .then(fetched => fetched.json())
              .then(json => res.json(json));
          }
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
              body: JSON.stringify({
                ...req.body,
                owner: req.user.id
              })
            })
              .then(fetched => fetched.json())
              .then(json => res.json(json));
          }
        }
      },
      [`/bff${uris.apis.plug}`]: {
        PATCH: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            confirmPermission('plug', req).then(
              () => {
                const uri = stringify(uris.apis.plug, {
                  plug: req.params.plug
                });
                fetch(`${apiBase}${uri}`, {
                  method: 'PATCH',
                  headers,
                  body: JSON.stringify({
                    ...req.body
                  })
                }).then(() => res.json({}));
              },
              () => res.status(401).json({})
            );
          }
        },
        DELETE: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            confirmPermission('plug', req).then(
              () => {
                const uri = stringify(uris.apis.plug, {
                  plug: req.params.plug
                });
                fetch(`${apiBase}${uri}`, {
                  method: 'DELETE',
                  headers
                }).then(() => res.json({}));
              },
              () => res.status(401).json({})
            );
          }
        }
      },
      [`/bff${uris.apis.keepalive}`]: {
        GET: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            const keepalive = req.params.keepalive;
            const uri = stringify(uris.apis.keepalive, {
              keepalive
            });
            fetch(`${apiBase}${uri}`, {
              method: 'GET',
              headers
            })
              .then(
                fetched =>
                  fetched.ok
                    ? fetched.json()
                    : {
                      id: keepalive,
                      plug: {
                        id: keepalive
                      },
                      message: 'KEEPALIVE',
                      interval: 5000,
                      enabled: false
                    }
              )
              .then(json => res.json(json));
          }
        },
        PATCH: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            const uri = stringify(uris.apis.keepalive, {
              keepalive: req.params.keepalive
            });
            fetch(`${apiBase}${uri}`, {
              method: 'GET',
              headers
            })
              .then(
                fetched =>
                  fetched.ok
                    ? fetch(`${apiBase}${uri}`, {
                      method: 'PATCH',
                      headers,
                      body: JSON.stringify({
                        message: req.body.message,
                        enabled: req.body.enabled,
                        interval: req.body.interval,
                        owner: req.user.id
                      })
                    })
                    : fetch(`${apiBase}${uris.apis.keepalives}`, {
                      method: 'POST',
                      headers,
                      body: JSON.stringify({
                        message: req.body.message,
                        enabled: req.body.enabled,
                        interval: req.body.interval,
                        plug: req.params.keepalive,
                        owner: req.user.id
                      })
                    })
              )
              .then(() => res.json({}));
          }
        }
      },
      [`/bff${uris.apis.favorites}`]: {
        GET: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            fetch(
              `${apiBase}${uris.apis.favorites}?owner=${req.user.id}&plug=${
                req.query.plug
              }&limit=10000&orderBy=createdAt`,
              {
                method: 'GET',
                headers
              }
            )
              .then(fetched => fetched.json())
              .then(json => res.json(json));
          }
        },
        POST: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            fetch(`${apiBase}${uris.apis.favorites}`, {
              method: 'POST',
              headers,
              body: JSON.stringify({
                ...req.body,
                owner: req.user.id
              })
            })
              .then(fetched => fetched.json())
              .then(json => res.json(json));
          }
        },
        DELETE: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            fetch(`${apiBase}${uris.apis.favorites}`, {
              method: 'DELETE',
              headers,
              body: JSON.stringify({
                ...req.body,
                owner: req.user.id
              })
            }).then(() => res.json({}));
          }
        }
      },
      [`/bff${uris.apis.favorite}`]: {
        PATCH: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            confirmPermission('favorite', req).then(
              () => {
                const uri = stringify(uris.apis.favorite, {
                  favorite: req.params.favorite
                });
                fetch(`${apiBase}${uri}`, {
                  method: 'PATCH',
                  headers,
                  body: JSON.stringify({
                    ...req.body
                  })
                }).then(() => res.json({}));
              },
              () => res.status(401).json({})
            );
          }
        },
        DELETE: {
          override: (req, res) => {
            if (!req.isAuthenticated()) {
              res.status(401).json({});
              return;
            }
            confirmPermission('favorite', req).then(
              () => {
                const uri = stringify(uris.apis.favorite, {
                  favorite: req.params.favorite
                });
                fetch(`${apiBase}${uri}`, {
                  method: 'DELETE',
                  headers
                }).then(() => res.json({}));
              },
              () => res.status(401).json({})
            );
          }
        }
      }
    }
  });
}
