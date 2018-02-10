import { server, passporter } from 'koiki';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import PrettyError from 'pretty-error';
import uuid from 'uuid-base62';

import config from './config';
import urls from './urls';
import uris from './uris';
import routes from './routes';
import reducers from './reducers';
import bff from './helpers/bff';

const express = require('express');
const expressWs = require('express-ws');

const app = expressWs(express()).app;
const pretty = new PrettyError();

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'images', 'favicon.png')));
app.use(express.static(path.join(__dirname, '..', 'static')));

const clients = {};
app.ws('/ws/:id', (ws, req) => {
  const id = req.params.id;
  if (!clients[id]) {
    clients[id] = [];
  }
  // eslint-disable-next-line no-param-reassign
  ws.id = uuid.v4();
  clients[id].push(ws);
  ws.on('message', (msg) => {
    clients[id].forEach((client) => {
      client.send(msg);
    });
  });
  ws.on('close', () => {
    // eslint-disable-next-line no-param-reassign
    clients[id] = clients[id].filter(client => client.id !== ws.id);
  });
});

passporter.use({ github: config.github }, app, config.global.base);

bff(app);

server({
  urls,
  reducers,
  routes,
  isDevelopment: __DEVELOPMENT__,
  app,
  path: uris.pages.root,
  origin: config.global.base,
  i18ndir: `${__dirname}/../i18n`,
  statics: config.app.statics,
  handlers: {
    error: error => console.error('ROUTER ERROR:', pretty.render(error))
  },
  manifest: {
    name: config.app.title,
    description: config.app.description
  },
  colors: {
    background: '#595455',
    primary: '#FFFFFC',
    secondary: '#8DB530'
  }
});

if (config.port) {
  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server.', config.app.title);
    console.info(
      '==> 💻  Open http://%s:%s in a browser to view the app.',
      config.host,
      config.port
    );
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
