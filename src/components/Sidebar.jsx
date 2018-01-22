import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IndexLink } from 'react-router';
import autoBind from 'react-autobind';
import { stringify } from 'koiki';
import uris from '../uris';
import styles from '../css/sidebar.less';
import fa from '../css/koiki-ui/fa/less/font-awesome.less';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  componentDidUpdate() {
    if (this.props.editing) {
      this.nameDOM.focus();
    }
  }

  handleAdd(event) {
    event.preventDefault();
    this.props.onAdd();
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.nameDOM.value;
    this.props.onSave({
      name
    });
  }

  handleBlur() {
    this.props.onBlur();
  }

  handleClick(event) {
    this.props.onBlur();
    this.props.closeSidebar();
    event.target.blur();
  }

  render() {
    const {
      plugs,
      editing,
      err,
      selected,
    } = this.props;
    const lang = this.props.lang;

    return (
      <div className={styles.sidebar}>
        <div className={styles.box}>
          <ul className={styles.nav}>
            <li>
              <IndexLink
                to={stringify(uris.pages.plugs, { lang })}
                className={`${styles.header} ${!selected ? styles.active : ''}`}
              >
                <i className={`${fa.fa} ${fa['fa-cubes']}`} />Plugs
              </IndexLink>
            </li>
            {
              plugs.map(plug =>
                <li key={plug.id} >
                  <IndexLink
                    to={stringify(uris.pages.plug, { lang, plug: plug.id })}
                    className={`${styles.child} ${plug.id === selected ? styles.active : ''}`}
                    onClick={this.handleClick}
                  >
                    {plug.name}
                  </IndexLink>
                </li>
              )
            }
            {editing ?
              <li>
                <form onSubmit={this.handleSubmit} >
                  <input
                    ref={(elem) => { this.nameDOM = elem; }}
                    className={`${styles.input} ${err ? styles.err : ''}`}
                    type="text"
                    placeholder="Collection name"
                    onBlur={this.handleBlur}
                  />
                </form>
              </li>
              :
              <li className={styles.plusContainer}>
                <button onClick={this.handleAdd} className={styles.plus} >
                  <i className={`${fa.fa} ${fa['fa-plus']}`} />
                </button>
              </li>
            }
          </ul>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  selected: PropTypes.string,
  plugs: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  err: PropTypes.object,
  lang: PropTypes.string.isRequired,
};
