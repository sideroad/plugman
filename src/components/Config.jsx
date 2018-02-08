import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'koiki-ui';
import TetherComponent from 'react-tether';

const styles = {
  config: require('../css/config.less'),
  ui: {
    fa: require('../css/koiki-ui/fa/less/font-awesome.less'),
    input: require('../css/koiki-ui/input.less'),
    button: require('../css/koiki-ui/button.less')
  }
};

class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      message: props.keepalive.message,
      interval: String(props.keepalive.interval),
      enabled: props.keepalive.enabled
    };
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.keepalive.message !== this.state.message ||
      String(nextProps.keepalive.interval) !== this.state.interval ||
      nextProps.keepalive.enabled !== this.state.enabled
    ) {
      this.setState({
        message: nextProps.keepalive.message,
        interval: String(nextProps.keepalive.interval),
        enabled: nextProps.keepalive.enabled
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick(e) {
    if (
      this.popup &&
      !this.popup.contains(e.target) &&
      this.button &&
      !this.button.contains(e.target)
    ) {
      this.setState({
        isOpen: false
      });
    }
  }

  render() {
    return (
      <TetherComponent
        attachment="top right"
        targetAttachment="bottom right"
        constraints={[
          {
            to: 'scrollParent'
          }
        ]}
      >
        <div
          className={styles.config.config}
          ref={(elem) => {
            this.button = elem;
          }}
        >
          <Button
            className={`${styles.config.cog} ${styles.config.button}`}
            icon="fa-cog"
            text=""
            color="primary"
            styles={styles.ui}
            onClick={() => {
              this.setState({ isOpen: !this.state.isOpen });
            }}
          />
        </div>
        {this.state.isOpen ? (
          <div
            className={styles.config.popup}
            ref={(elem) => {
              this.popup = elem;
            }}
          >
            <div className={styles.config.keepalive}>
              <Input
                icon="no-icon"
                className={styles.config.message}
                styles={styles.ui}
                value={this.state.message}
                onChange={(evt) => {
                  this.setState({
                    message: evt.target.value
                  });
                }}
                onBlur={() => {
                  this.props.onChangeKeepalive({
                    ...this.props.keepalive,
                    message: this.state.message
                  });
                }}
              />
              <Input
                icon="no-icon"
                className={styles.config.interval}
                type="number"
                styles={styles.ui}
                value={this.state.interval}
                onChange={(evt) => {
                  this.setState({
                    interval: evt.target.value
                  });
                }}
                onBlur={() => {
                  this.props.onChangeKeepalive({
                    ...this.props.keepalive,
                    interval: this.state.interval
                  });
                }}
              />ms
              <Button
                className={`
                  ${styles.config.heartbeat}
                  ${styles.config.button}
                  ${this.state.enabled ? styles.config.enabled : styles.config.disabled}
                `}
                icon="fa-heartbeat"
                text=""
                styles={styles.ui}
                onClick={() => {
                  const enabled = !this.state.enabled;
                  this.setState(
                    {
                      enabled
                    },
                    () => {
                      this.props.onChangeKeepalive({
                        ...this.props.keepalive,
                        enabled
                      });
                    }
                  );
                }}
              />
            </div>
          </div>
        ) : null}
      </TetherComponent>
    );
  }
}

Config.propTypes = {
  keepalive: PropTypes.shape({
    message: PropTypes.string,
    interval: PropTypes.number,
    enabled: PropTypes.bool
  }).isRequired,
  onChangeKeepalive: PropTypes.func.isRequired
};

export default Config;
