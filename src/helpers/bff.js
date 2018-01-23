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
    return fetch(`${apiBase}${uri}`, {
      method: 'GET',
      headers,
    })
      .then(fetched => fetched.json())
      .then(json => (
        json.owner === req.user.id ?
          Promise.resolve() :
          Promise.reject()
      ));
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
              body: JSON.stringify({
                ...req.body,
                owner: req.user.id,
              }),
            }).then(fetched => fetched.json())
              .then(json => res.json(json));
          },
        },
      },
      [`/bff${uris.apis.plug}`]: {
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
                  body: JSON.stringify({
                    ...req.body
                  }),
                }).then(() => res.json({}));
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
                }).then(() => res.json({}));
              }, () => res.status(401).json({}));
          },
        },
      },
    },
  });
}
