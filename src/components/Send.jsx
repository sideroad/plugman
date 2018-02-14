import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'koiki-ui';
import _ from 'lodash';
import Stopwatch from './Stopwatch';

const styles = {
  send: require('../css/send.less'),
  ui: {
    fa: require('../css/koiki-ui/fa/less/font-awesome.less'),
    button: require('../css/koiki-ui/button.less')
  }
};

const DISCONNECTED = 3;

class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: '',
      favorites: props.favorites,
      index: props.favorites.length
    };
    this.onChange = this.onChange.bind(this);
    this.onClickFavorite = this.onClickFavorite.bind(this);
    this.onSend = this.onSend.bind(this);
    this.count = 0;
  }
  componentWillReceiveProps(nextProps) {
    if (_.differenceWith(nextProps.favorites, this.state.favorites, _.isEqual).length) {
      this.setState({
        favorites: nextProps.favorites
      });
    }
  }
  componentWillUnmount() {
    this.props.socket.close();
  }
  onChange(event) {
    this.setState({
      contents: event.target.value
    });
  }
  onClickFavorite() {
    const favorites = this.state.favorites.filter((_favorite, index) => index !== this.state.index);
    const favorite = this.state.favorites[this.state.index];
    if (favorite) {
      this.setState(
        {
          favorites,
          contents: favorites[this.state.index] ? favorites[this.state.index].contents : ''
        },
        () => {
          this.props.onDeleteFavorite(favorite);
        }
      );
    } else {
      this.setState(
        {
          favorites: this.state.favorites.concat([
            {
              contents: this.state.contents
            }
          ])
        },
        () => {
          this.props.onSaveFavorite({
            contents: this.state.contents
          });
        }
      );
    }
  }
  onSend() {
    if (this.state.contents && this.props.socket.readyState !== DISCONNECTED) {
      this.props.socket.send(this.state.contents);
      this.props.onSend(this.count);
      this.count += 1;
    }
  }
  onPrevNextHistory(operation) {
    const newIndex = operation === 'prev' ? this.state.index - 1 : this.state.index + 1;
    this.setState({
      index: newIndex,
      contents: this.state.favorites[newIndex] ? this.state.favorites[newIndex].contents : ''
    });
  }
  render() {
    const isFavorite = this.state.index !== this.state.favorites.length;
    return (
      <div className={styles.send.column}>
        <div className={styles.send.title}>
          <div>ws.send</div>
          <button className={styles.send.favorite} onClick={this.onClickFavorite}>
            <i
              className={`
                ${styles.ui.fa.fa}
                ${isFavorite ? styles.send.on : styles.send.off}
                ${isFavorite ? styles.ui.fa['fa-heart'] : styles.ui.fa['fa-heart-o']}
              `}
              aria-hidden="true"
            />
          </button>
        </div>
        <div className={styles.send.container}>
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
            disabled={this.state.index === this.state.favorites.length}
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
          <Stopwatch
            onSend={() => {
              this.onSend();
            }}
          />
        </div>
      </div>
    );
  }
}

Send.propTypes = {
  socket: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
  onDeleteFavorite: PropTypes.func.isRequired,
  onSaveFavorite: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired
};

export default Send;
