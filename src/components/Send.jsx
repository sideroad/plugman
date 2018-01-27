import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'koiki-ui';

const styles = {
  send: require('../css/send.less'),
  ui: {
    fa: require('../css/koiki-ui/fa/less/font-awesome.less'),
    button: require('../css/koiki-ui/button.less'),
  },
};

class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: '',
      histories: [],
      index: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.onSend = this.onSend.bind(this);
  }
  componentWillUnmount() {
    this.props.socket.close();
  }
  onChange(event) {
    this.setState({
      contents: event.target.value,
    });
  }
  onSend() {
    if (this.state.contents) {
      this.props.socket.send(this.state.contents);
      this.setState({
        contents: '',
        histories: this.state.histories.concat([this.state.contents]),
        index: this.state.histories.length + 1,
      });
    }
  }
  onPrevNextHistory(operation) {
    const newIndex = operation === 'prev' ? this.state.index - 1 :
           this.state.index + 1;
    this.setState({
      index: newIndex,
      contents: this.state.histories[newIndex]
    });
  }
  render() {
    return (
      <div className={styles.send.column}>
        <div className={styles.send.title}>
          ws.send
        </div>
        <div className={styles.send.container} >
          <button
            disabled={this.state.index === 0}
            className={`${styles.send.bracket} ${styles.send.left}`}
            onClick={() => this.onPrevNextHistory('prev')}
          >
            <i className={`${styles.ui.fa.fa} ${styles.ui.fa['fa-play']}`} aria-hidden="true" />
          </button>
          <textarea
            autoFocus
            className={styles.send.textarea}
            value={this.state.contents || ''}
            onChange={this.onChange}
          />
          <button
            disabled={this.state.index === this.state.histories.length}
            className={`${styles.send.bracket} ${styles.send.right}`}
            onClick={() => this.onPrevNextHistory('next')}
          >
            <i className={`${styles.ui.fa.fa} ${styles.ui.fa['fa-play']}`} aria-hidden="true" />
          </button>
          <Button
            className={styles.send.send}
            icon="fa-envelope-o"
            text=""
            styles={styles.ui}
            onClick={this.onSend}
          />
        </div>
      </div>
    );
  }
}

Send.propTypes = {
  socket: PropTypes.object.isRequired
};

export default Send;
