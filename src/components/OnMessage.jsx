import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = require('../css/on-message.less');

class OnMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }
  componentDidMount() {
    this.props.socket.onmessage = ({ data }) => {
      let message = data;
      try {
        message = JSON.stringify(JSON.parse(data), null, 2);
      } catch (error) {
        console.log('');
      }
      this.setState({
        message,
      });
    };
  }
  componentWillUnmount() {
    this.props.socket.close();
  }
  render() {
    return (
      <div className={styles.column} >
        <div className={styles.title}>
          ws.onmessage
        </div>
        <div className={styles.container} >
          <div className={styles.bracket} >(&quot;</div>
          <pre
            className={styles.message}
          >
            {this.state.message}
          </pre>
          <div className={styles.bracket} >&quot;)</div>
        </div>
      </div>
    );
  }
}

OnMessage.propTypes = {
  socket: PropTypes.object.isRequired
};

export default OnMessage;
