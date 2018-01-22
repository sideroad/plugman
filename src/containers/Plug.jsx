import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stringify } from 'koiki';
import { asyncConnect } from 'redux-connect';
import { push } from 'react-router-redux';
import * as pageActions from '../reducers/page';
import * as plugActions from '../reducers/plug';
import * as wsActions from '../reducers/ws';
import uris from '../uris';
import PlugComponent from '../components/Plug';
import ws from '../helpers/ws';

const Plug = (props, { fetcher }) =>
  <PlugComponent
    lang={props.lang}
    err={props.err}
    plug={props.plug}
    sockets={props.sockets}
    connected={props.connected}
    onChangeUrl={(event) => {
      props.change({
        id: props.plug.id,
        url: event.target.value
      });
    }}
    onConnect={() => {
      props.connect(fetcher, props.plug);
    }}
    onDisconnect={(socket) => {
      props.disconnect(socket);
    }}
    onDelete={() => {
      props.delete(fetcher, props.plug, props.lang);
    }}
  />;

Plug.propTypes = {
  lang: PropTypes.string.isRequired,
  err: PropTypes.object,
  plug: PropTypes.object.isRequired,
  sockets: PropTypes.array.isRequired,
  connected: PropTypes.bool.isRequired,
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

Plug.contextTypes = {
  fetcher: PropTypes.object.isRequired
};

const connected = connect(
  (state, props) => ({
    plug: state.plug.items.find(plug => plug.id === props.params.plug) || {},
    sockets: state.ws.sockets,
    editing: state.plug.editing,
    err: state.plug.err,
    connected: state.ws.connected,
    lang: props.params.lang,
  }),
  dispatch => ({
    change: (plug) => {
      dispatch(plugActions.change(plug));
    },
    disconnect: (websocket) => {
      dispatch(wsActions.disconnect(websocket));
    },
    connect: (fetcher, plug) => {
      dispatch(pageActions.load());
      fetcher.plug.update({
        plug: plug.id,
        url: plug.url,
      })
        .then(
          () => {
            const websocket = ws(plug.url);
            websocket.onopen = () => {
              dispatch(wsActions.connect(websocket));
              dispatch(pageActions.finishLoad());
            };
            websocket.onclose = () => {
              dispatch(wsActions.disconnect(websocket));
            };
          });
    },
    delete: (fetcher, plug, lang) => {
      dispatch(pageActions.load());
      fetcher.message.deletes({
        plug: plug.id,
      }).then(
        () =>
          fetcher.plug.delete({
            plug: plug.id
          })
      .then(
        () => {
          dispatch(pageActions.finishLoad());
          dispatch(push(stringify(uris.pages.plugs, { lang })));
        }
      ));
    }
  })
)(Plug);


const asynced = asyncConnect([{
  promise: ({ helpers: { fetcher }, params, store }) =>
    Promise.all([
      fetcher.message.gets({
        plug: params.plug
      }),
      store.dispatch(wsActions.reset()),
    ])
}])(connected);

export default asynced;
