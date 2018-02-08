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

const Plug = (props, { fetcher }) => (
  <PlugComponent
    lang={props.lang}
    err={props.err}
    plug={props.plug}
    keepalive={props.keepalive}
    sockets={props.sockets}
    connected={props.connected}
    onChangeUrl={(event) => {
      props.change({
        id: props.plug.id,
        url: event.target.value
      });
    }}
    onChangeKeepalive={(keepalive) => {
      props.updateKeepalive(fetcher, {
        ...keepalive,
        keepalive: props.plug.id
      });
    }}
    onConnect={() => {
      props.connect(fetcher, props.plug, props.keepalive);
    }}
    onDisconnect={(socket) => {
      props.disconnect(socket);
    }}
    onSaveFavorite={(favorite) => {
      props.saveFavorite(fetcher, favorite, props.plug);
    }}
    onDeleteFavorite={(favorite) => {
      props.deleteFavorite(fetcher, favorite, props.plug);
    }}
    onDelete={() => {
      props.delete(fetcher, props.plug, props.lang);
    }}
    favorites={props.favorites}
  />
);

Plug.propTypes = {
  lang: PropTypes.string.isRequired,
  err: PropTypes.object,
  plug: PropTypes.object.isRequired,
  keepalive: PropTypes.object.isRequired,
  sockets: PropTypes.array.isRequired,
  connected: PropTypes.bool.isRequired,
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
  saveFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  updateKeepalive: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired
};

Plug.contextTypes = {
  fetcher: PropTypes.object.isRequired
};

const connected = connect(
  (state, props) => ({
    plug: state.plug.items.find(plug => plug.id === props.params.plug) || {},
    keepalive: state.keepalive.item,
    sockets: state.ws.sockets,
    editing: state.plug.editing,
    err: state.plug.err,
    connected: state.ws.connected,
    lang: props.params.lang,
    favorites: state.favorite.items
  }),
  dispatch => ({
    updateKeepalive: (fetcher, keepalive) => {
      fetcher.keepalive.update(keepalive);
    },
    change: (plug) => {
      dispatch(plugActions.change(plug));
    },
    disconnect: (websocket) => {
      dispatch(wsActions.disconnect(websocket));
    },
    connect: (fetcher, plug, keepalive) => {
      dispatch(pageActions.load());
      fetcher.plug
        .update({
          plug: plug.id,
          url: plug.url
        })
        .then(() => {
          const websocket = ws(plug.url);
          let intervalId;
          websocket.onopen = () => {
            dispatch(wsActions.connect(websocket));
            dispatch(pageActions.finishLoad());
            if (keepalive.enabled) {
              intervalId = setInterval(() => {
                websocket.send(keepalive.message);
              }, keepalive.interval);
            }
          };
          websocket.onclose = () => {
            dispatch(wsActions.disconnect(websocket));
            dispatch(pageActions.finishLoad());
            if (intervalId) {
              clearInterval(intervalId);
            }
          };
        });
    },
    delete: (fetcher, plug, lang) => {
      dispatch(pageActions.load());
      fetcher.plug
        .delete({
          plug: plug.id
        })
        .then(() =>
          fetcher.favorite.deletes({
            plug: plug.id
          })
        )
        .then(
          () => {
            dispatch(pageActions.finishLoad());
            dispatch(push(stringify(uris.pages.plugs, { lang })));
          },
          () => {
            dispatch(pageActions.finishLoad());
          }
        );
    },
    saveFavorite: (fetcher, favorite, plug) => {
      fetcher.favorite
        .add({
          ...favorite,
          plug: plug.id
        })
        .then(() =>
          fetcher.favorite.gets({
            plug: plug.id
          })
        )
        .then(
          () => {
            dispatch(pageActions.finishLoad());
          },
          () => {
            dispatch(pageActions.finishLoad());
          }
        );
    },
    deleteFavorite: (fetcher, favorite, plug) => {
      fetcher.favorite
        .delete({
          favorite: favorite.id
        })
        .then(() =>
          fetcher.favorite.gets({
            plug: plug.id
          })
        )
        .then(
          () => {
            dispatch(pageActions.finishLoad());
          },
          () => {
            dispatch(pageActions.finishLoad());
          }
        );
    }
  })
)(Plug);

const asynced = asyncConnect([
  {
    promise: ({ helpers: { fetcher }, store, params }) =>
      Promise.all([
        store.dispatch(wsActions.reset()),
        fetcher.favorite.gets({
          plug: params.plug
        }),
        fetcher.keepalive.get({
          keepalive: params.plug
        })
      ])
  }
])(connected);

export default asynced;
