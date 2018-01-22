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
    this.props.socket.send(this.state.contents);
  }
  render() {
    return (
      <div className={styles.send.column}>
        <div className={styles.send.title}>
          ws.send
        </div>
        <div className={styles.send.container} >
          <div className={styles.send.bracket} >(&quot;</div>
          <textarea
            className={styles.send.textarea}
            value={this.state.contents}
            onChange={this.onChange}
          />
          <div className={styles.send.bracket} >&quot;)</div>
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
