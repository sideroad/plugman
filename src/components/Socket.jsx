import React from 'react';
import PropTypes from 'prop-types';
import Send from '../components/Send';
import OnMessage from '../components/OnMessage';

const styles = require('../css/socket.less');

class Socket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverPlug: false
    };
  }

  render() {
    const hoverClass =
      this.state.hoverPlug === null ? '' : this.state.hoverPlug ? styles.hovered : styles.unhovered;
    return (
      <li className={styles.line}>
        <button
          className={`${styles.plugLeft} ${hoverClass}`}
          onMouseEnter={() => this.setState({ hoverPlug: true })}
          onMouseLeave={() => this.setState({ hoverPlug: false })}
          onClick={() => this.props.onDisconnect(this.props.socket)}
        />
        <div className={styles.socket}>
          <Send
            socket={this.props.socket}
            favorites={this.props.favorites}
            onSaveFavorite={this.props.onSaveFavorite}
            onDeleteFavorite={this.props.onDeleteFavorite}
          />
          <OnMessage socket={this.props.socket} />
        </div>
        <button
          className={`${styles.plugRight} ${hoverClass}`}
          onClick={() => this.props.onDisconnect(this.props.socket)}
        />
      </li>
    );
  }
}

Socket.propTypes = {
  socket: PropTypes.object.isRequired,
  onDisconnect: PropTypes.func.isRequired,
  onSaveFavorite: PropTypes.func.isRequired,
  onDeleteFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired
};

export default Socket;
