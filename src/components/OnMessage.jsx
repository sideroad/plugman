import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = require('../css/on-message.less');
const fa = require('../css/koiki-ui/fa/less/font-awesome.less');

class OnMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      histories: [],
      index: 0
    };
    this.count = 0;
  }
  componentDidMount() {
    this.props.socket.onmessage = ({ data }) => {
      let message = data;
      try {
        message = JSON.stringify(JSON.parse(data), null, 2);
      } catch (error) {
        console.log('');
      }
      this.setState(
        {
          message,
          histories: this.state.histories.concat([message]),
          index: this.state.histories.length
        },
        () => {
          this.props.onMessage(this.count);
          this.count += 1;
        }
      );
    };
  }
  componentWillUnmount() {
    this.props.socket.close();
  }
  onPrevNextHistory(operation) {
    this.setState({
      index: operation === 'prev' ? this.state.index - 1 : this.state.index + 1
    });
  }
  render() {
    return (
      <div className={styles.column}>
        <div className={styles.title}>ws.onmessage</div>
        <div className={styles.container}>
          <button
            disabled={this.state.index === 0}
            className={`${styles.bracket} ${styles.left}`}
            onClick={() => this.onPrevNextHistory('prev')}
          >
            <i className={`${fa.fa} ${fa['fa-play']}`} aria-hidden="true" />
          </button>
          <pre className={styles.message}>{this.state.histories[this.state.index]}</pre>
          <button
            disabled={
              !this.state.histories.length || this.state.index === this.state.histories.length - 1
            }
            className={`${styles.bracket} ${styles.right}`}
            onClick={() => this.onPrevNextHistory('next')}
          >
            <i className={`${fa.fa} ${fa['fa-play']}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}

OnMessage.propTypes = {
  socket: PropTypes.object.isRequired,
  onMessage: PropTypes.func.isRequired
};

export default OnMessage;
