import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { auth } from 'koiki';
import uris from './uris';
import config from './config';
import { set as setUser } from './reducers/user';

import Root from './containers/Root';
import Home from './containers/Home';
import Plugs from './containers/Plugs';
import Plug from './containers/Plug';
import NotFound from './containers/NotFound';

export default (store, cookie) =>
  <Route
    path={uris.pages.root}
    component={Root}
  >
    <IndexRedirect to={uris.pages.plugs} />
    <Route
      path={uris.pages.plugs}
      component={Plugs}
      onEnter={auth.login(store, cookie, config.global.base, 'github', setUser)}
    >
      <IndexRoute component={Home} />
      <Route path={uris.pages.plug} component={Plug} />
    </Route>
    { /* Catch all route */ }
    <Route path="*" component={NotFound} status={404} />
  </Route>;
