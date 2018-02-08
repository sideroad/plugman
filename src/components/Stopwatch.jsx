import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'koiki-ui';
import TetherComponent from 'react-tether';

const styles = {
  stopwatch: require('../css/stopwatch.less'),
  ui: {
    fa: require('../css/koiki-ui/fa/less/font-awesome.less'),
    input: require('../css/koiki-ui/input.less'),
    button: require('../css/koiki-ui/button.less')
  }
};

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      interval: '1000',
      played: false
    };
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
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
        classes={{
          element: styles.stopwatch.tether
        }}
        attachment="bottom center"
        targetAttachment="top center"
        constraints={[
          {
            to: 'scrollParent'
          }
        ]}
      >
        <div
          className={styles.stopwatch.stopwatch}
          ref={(elem) => {
            this.button = elem;
          }}
        >
          <Button
            className={`${styles.stopwatch.button}`}
            icon="fa-heartbeat"
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
            className={styles.stopwatch.popup}
            ref={(elem) => {
              this.popup = elem;
            }}
          >
            <div>
              <input
                className={styles.stopwatch.interval}
                type="number"
                value={this.state.interval}
                onChange={(evt) => {
                  this.setState({
                    interval: evt.target.value
                  });
                }}
                autoFocus
              />ms
            </div>
            <button
              className={`
                ${styles.stopwatch.player}
                ${this.state.played ? styles.stopwatch.played : styles.stopwatch.stopped}
              `}
              onClick={() => {
                const played = !this.state.played;
                this.setState(
                  {
                    played
                  },
                  () => {
                    if (played) {
                      this.props.onStart(Number(this.state.interval));
                    } else {
                      this.props.onStop();
                    }
                  }
                );
              }}
            >
              <i
                className={`
                  ${styles.ui.fa.fa}
                  ${
                    this.state.played
                      ? styles.ui.fa['fa-stop-circle']
                      : styles.ui.fa['fa-play-circle']
                  }
                `}
                aria-hidden="true"
              />
            </button>
          </div>
        ) : null}
      </TetherComponent>
    );
  }
}

Stopwatch.propTypes = {
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

export default Stopwatch;
