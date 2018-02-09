import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stringify } from 'koiki';
import { asyncConnect } from 'redux-connect';
import { push } from 'react-router-redux';
import uuid from 'uuid';
import styles from '../css/home.less';
import { load, finishLoad } from '../reducers/page';
import uris from '../uris';
import config from '../config';

const Home = (props, { fetcher }) => (
  <div className={styles.getstart}>
    <div>Click + to create Plug on sidebar</div>
    <div>or</div>
    <div>
      <button
        className={styles.button}
        onClick={() => props.generateTest(fetcher, props.user, props.lang)}
      >
        Generate testable WebSocket
      </button>
    </div>
  </div>
);

Home.propTypes = {
  lang: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  generateTest: PropTypes.func.isRequired
};

Home.contextTypes = {
  fetcher: PropTypes.object.isRequired
};

const connected = connect(
  (state, props) => ({
    open: state.page.open,
    user: state.user.item,
    lang: props.params.lang
  }),
  dispatch => ({
    generateTest: (fetcher, user, lang) => {
      dispatch(load());
      const id = uuid.v4();
      fetcher.plug
        .add({
          name: id,
          url: `${config.global.base.replace(/^https/, 'wss').replace(/^http/, 'ws')}/ws/${id}`,
          owner: user.id
        })
        .then(
          res =>
            fetcher.plug.gets().then(() => {
              dispatch(finishLoad());
              dispatch(
                push(
                  stringify(uris.pages.plug, {
                    lang,
                    plug: res.body.id
                  })
                )
              );
            }),
          () => dispatch(finishLoad())
        );
    }
  })
)(Home);

const asynced = asyncConnect([
  {
    promise: () => {
      const promises = [];
      return Promise.all(promises);
    }
  }
])(connected);

export default asynced;
