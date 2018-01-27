import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'koiki-ui';
import Socket from '../components/Socket';

const styles = {
  plug: require('../css/plug.less'),
  ui: {
    fa: require('../css/koiki-ui/fa/less/font-awesome.less'),
    input: require('../css/koiki-ui/input.less'),
    button: require('../css/koiki-ui/button.less'),
  },
};

const Plug = props =>
  <div
    className={styles.plug.container}
  >
    <div className={styles.plug.header}>
      <h1 className={styles.plug.title}>
        {props.plug.name}
      </h1>
      <Button
        className={styles.plug.delete}
        icon="fa-trash"
        text=""
        color="secondary"
        styles={styles.ui}
        onClick={props.onDelete}
      />
    </div>
    <div className={styles.plug.url} >
      <Input
        icon="no-icon"
        styles={styles.ui}
        value={props.plug.url || ''}
        onChange={props.onChangeUrl}
        onSubmit={props.onConnect}
        placeholder="WebSocket URL"
      />
    </div>
    {
      props.sockets.length ?
        <ul className={styles.plug.sockets} >
          {
            props.sockets.map(socket =>
              <Socket
                socket={socket}
                onConnect={props.onConnect}
                onDisconnect={props.onDisconnect}
              />
            )
          }
        </ul>
      : null
    }
    <div className={styles.plug.controls} >
      <Button
        className={`${styles.plug.connect} ${props.connected ? styles.plug.connected : styles.plug.disconnected}`}
        icon="fa-plug"
        text=""
        styles={styles.ui}
        onClick={props.onConnect}
      />
    </div>
  </div>;

Plug.propTypes = {
  sockets: PropTypes.array.isRequired,
  plug: PropTypes.object.isRequired,
  connected: PropTypes.bool.isRequired,
  onChangeUrl: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onDisconnect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Plug;
