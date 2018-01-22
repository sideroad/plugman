import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stringify } from 'koiki';
import { asyncConnect } from 'redux-connect';
import { push } from 'react-router-redux';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import { load, finishLoad, toggleSidebar, closeSidebar } from '../reducers/page';
import { add, cancel } from '../reducers/plug';
import uris from '../uris';
import styles from '../css/plugs.less';

const Plugs = (props, context) => {
  const save = props.save;
  return (
    <div className={props.open ? styles.fixed : ''} >
      <Header
        toggle={props.toggleSidebar}
        url={stringify(uris.pages.plugs, {
          lang: props.lang,
        })}
        open={props.open}
      />
      <div className={styles.columns}>
        <div className={`${styles.left} ${props.open ? styles.open : ''}`}>
          <Sidebar
            selected={props.selected}
            plugs={props.plugs}
            lang={props.lang}
            err={props.err}
            editing={props.editing}
            onBlur={props.cancel}
            closeSidebar={props.closeSidebar}
            onAdd={props.add}
            onSave={values => save(context.fetcher, values, props.user, props.lang)}
          />
        </div>
        <div className={`${styles.right} ${props.open ? styles.open : ''}`} >
          {props.children}
        </div>
      </div>
      <button
        className={`${styles.modal} ${props.open ? styles.open : ''}`}
        onClick={props.closeSidebar}
      />
      <Loading />
    </div>
  );
};

Plugs.propTypes = {
  children: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  plugs: PropTypes.array,
  open: PropTypes.bool,
  editing: PropTypes.bool,
  add: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  err: PropTypes.object,
  selected: PropTypes.string,
};

Plugs.contextTypes = {
  fetcher: PropTypes.object.isRequired,
};

const connected = connect(
  (state, props) => ({
    plugs: state.plug.items,
    editing: state.plug.editing,
    err: state.plug.err,
    user: state.user.item,
    selected: props.params.plug,
    lang: props.params.lang,
  }),
  dispatch => ({
    cancel: () => dispatch(cancel()),
    add: () => dispatch(add()),
    save: (fetcher, values, user, lang) => {
      if (values.name) {
        dispatch(closeSidebar());
        dispatch(load());
        fetcher.plug.add({
          ...values,
          owner: user.id,
        })
          .then(res_ =>
            fetcher.plug.gets()
              .then(() => {
                dispatch(finishLoad());
                dispatch(push(stringify(uris.pages.plug, {
                  lang,
                  plug: console.log(res_) || res_.body.id,
                })));
              }),
          () => dispatch(finishLoad()));
      }
    },
    toggleSidebar: () => dispatch(toggleSidebar()),
    closeSidebar: () => dispatch(closeSidebar())
  })
)(Plugs);


const asynced = asyncConnect([{
  promise: ({ helpers: { fetcher } }) =>
    Promise.all([
      fetcher.plug.gets(),
    ])
}])(connected);

export default asynced;
