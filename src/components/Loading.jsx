import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = require('../css/loading.less');

const Loading = props =>
  <div className={`${styles.modal} ${props.loading ? styles.open : ''}`} >
    <img className={styles.plug} alt="plug" src={require('../images/plug.png')} />
    <div className={styles.plugball} >
      <img className={styles.electric} alt="electric" src={require('../images/electric.png')} />
    </div>
  </div>;

Loading.propTypes = {
  loading: PropTypes.bool
};

const connected = connect(
  state => ({
    loading: state.page.loading
  })
)(Loading);

export default connected;
