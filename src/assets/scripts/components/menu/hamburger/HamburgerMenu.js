import React from 'react';
import DropdownMenuStyles from './HamburgerMenu.scss';
import Menu from './../Menu';
import Drawer from './../../../objects/drawer/Drawer';
import Icon from './../../../objects/icon/Icon';

export default class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  open() { this.setState({ open: true }); }
  close() { this.setState({ open: false }); }

  render() {
    let { className, right } = this.props;
    let { open } = this.state;

    let icon = "hamburger";
    className = "c-hamburger-menu" + (className ? " " + className : "");

    if(this.state.open) {
      className += " is-open";
      icon = "close";
    }

    return (
      <div className={className}>
        <button type="button" className="c-hamburger-menu__button" onClick={() => this.toggle()}>
          <Icon className="c-hamburger-menu__button-icon" name={ icon } baseline />
        </button>

        <Drawer open={open} right={right} onClose={() => this.close()} className="c-hamburger-menu__drawer">
          <Menu {...this.props} className="c-hamburger-menu__drawer-menu" />
        </Drawer>
      </div>
    );
  }
}
