import React from 'react';
import { NavLink } from 'react-router-dom';

const checkDomain = function(url) {
  if ( url.indexOf('//') === 0 ) { url = location.protocol + url; }
  return url.toLowerCase().replace(/([a-z])?:\/\//,'$1').split('/')[0];
};

const isExternal = function(url) {
  return ( ( url.indexOf(':') > -1 || url.indexOf('//') > -1 ) && checkDomain(location.href) !== checkDomain(url) );
};

export default class Link extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let clonedProps = Object.assign({}, this.props);
    clonedProps.activeClassName = clonedProps.activeClassName || "is-active";
    if(isExternal(clonedProps.to)) {
      delete clonedProps.activeClassName;
      return <a {...clonedProps} href={ clonedProps.to } />;
    }

    return <NavLink {...clonedProps} />;
  }
}

export {
  checkDomain,
  isExternal
};
