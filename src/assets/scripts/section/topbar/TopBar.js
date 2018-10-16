import React from 'react';
import { withSection } from './../../wrappers/section/Section';

import PageBoundary from './../../objects/layout/boundary/PageBoundary';
import TopBarStyles from './TopBar.scss';

const TopBar = withSection((props) => {
  let { link, title } = props.settings;
  let children;

  if(link && link.value) {
    children = (
      <Link to={ link.value } className="c-topbar__link">
        { title.value }
      </Link>
    );
  } else {
    children = <span className="c-topbar__link">{ title.value }</span>;
  }

  return (
    <div {...props} className="c-topbar">
      <PageBoundary className="c-topbar__boundary">
        { children }
      </PageBoundary>
    </div>
  );
});

export default (props) => <TopBar group="topbar" {...props} />;
