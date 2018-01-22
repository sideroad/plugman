import React from 'react';

const styles = require('../css/logo.less');
const img = require('../images/logo.png');

const Logo = () =>
  <div className={styles.lead}>
    <img
      alt="plugman"
      className={styles.logo}
      src={img}
    />
    <div className={styles.title}>
      <span className={styles.plug} >plug</span>
      <span className={styles.man} >man</span>
    </div>
  </div>;

Logo.propTypes = {
};

export default Logo;
