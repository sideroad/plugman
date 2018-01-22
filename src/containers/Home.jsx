import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import styles from '../css/home.less';

const Home = () =>
  <div className={styles.getstart} >
    Click + to create Plug on sidebar
  </div>;

Home.propTypes = {
  lang: PropTypes.string.isRequired,
};

const connected = connect(
  (state, ownProps) => ({
    open: state.page.open,
    lang: ownProps.params.lang,
  }),
  {}
)(Home);

const asynced = asyncConnect([{
  promise: () => {
    const promises = [];
    return Promise.all(promises);
  }
}])(connected);

export default asynced;
