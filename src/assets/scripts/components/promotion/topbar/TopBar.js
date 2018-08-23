//StaticHeader Section
import React from 'react';
import StaticSection from './../../sections/StaticSection';
import PageBoundary from './../../../objects/layout/boundary/PageBoundary';
import TopBarStyles from './TopBar.scss';

const TopBar = (props) => {
  let settings = props.data.settingsById;
  let children;

  if(settings.link.value) {
    children = <Link to={settings.link.value} className="c-topbar__link" children={settings.title.value} />;
  } else {
    children = <span className="c-topbar__link">{ settings.title.value }</span>;
  }

  return (
    <div className="c-topbar">
      <PageBoundary className="c-topbar__boundary">
        { children }
      </PageBoundary>
    </div>
  );
};

//Wrap in static section
export default (props) => {
  return <StaticSection {...props} group="topbar" component={TopBar} />;
}
