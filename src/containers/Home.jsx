import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Card from '../components/Card';


const Home = () =>
  <div>
    <Card
      lead={{
        start: 'Click + to create Plug on sidebar',
        create: ''
      }}
      items={[]}
    />
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
