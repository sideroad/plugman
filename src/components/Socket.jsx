import React from 'react';
import PropTypes from 'prop-types';
import Send from '../components/Send';
import OnMessage from '../components/OnMessage';

const styles = require('../css/socket.less');

class Socket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverPlug: false,
      sends: [],
      receives: []
    };
  }

  render() {
    const hoverClass =
      this.state.hoverPlug === null ? '' : this.state.hoverPlug ? styles.hovered : styles.unhovered;
    return (
      <li className={styles.line}>
        {this.state.sends.map(send => (
          <div
            key={send}
            className={`${styles.plugball} ${styles.sends}`}
            onAnimationEnd={() => {
              this.setState({
                sends: this.state.sends.filter(sender => send !== sender)
              });
            }}
          >
            <img
              className={styles.electric}
              alt="electric"
              src={require('../images/electric.png')}
            />
          </div>
        ))}
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
            onSend={(count) => {
              this.setState({
                sends: this.state.sends.concat([count])
              });
            }}
          />
          <OnMessage
            socket={this.props.socket}
            onMessage={(count) => {
              this.setState({
                receives: this.state.receives.concat([count])
              });
            }}
          />
        </div>
        {this.state.receives.map(receive => (
          <div
            key={receive}
            className={`${styles.plugball} ${styles.receives}`}
            onAnimationEnd={() => {
              this.setState({
                receives: this.state.receives.filter(receiver => receive !== receiver)
              });
            }}
          >
            <img
              className={styles.electric}
              alt="electric"
              src={require('../images/electric.png')}
            />
          </div>
        ))}
        <button
          className={`${styles.plugRight} ${hoverClass}`}
          onMouseEnter={() => this.setState({ hoverPlug: true })}
          onMouseLeave={() => this.setState({ hoverPlug: false })}
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
