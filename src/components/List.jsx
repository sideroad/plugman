import React from 'react';
import PropTypes from 'prop-types';

const styles = require('../css/list.less');

const List = props =>
  <ul className={styles.spots} >
    {
      props.items.map(item =>
        <li key={item.name}>{item.name}: {item.age}</li>
      )
    }
  </ul>;

List.propTypes = {
  items: PropTypes.array.isRequired,
};

export default List;
