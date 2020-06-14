import React, { Fragment, Component } from 'react';

import './layout.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// import Announcement from '../../components/Announcement/Announcement';

class Layout extends Component {
  state = {
    showNav: false,
  };

  toggleSideNav = () => {
    this.setState({
      showNav: !this.state.showNav,
    });
  };
  render() {
    return (
      <div>
        <Header
          user={this.props.user}
          showNav={this.state.showNav}
          onClickNav={() => this.toggleSideNav()}
          // onHideNav={() => this.toggleSideNav(false)}
          // onOpenNav={() => this.toggleSideNav(true)}
        />
        {/* <Announcement /> */}
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
