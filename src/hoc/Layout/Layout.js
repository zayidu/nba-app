import React, { Component } from 'react';
import './layout.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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
          showNav={this.state.showNav}
          onClickNav={() => this.toggleSideNav()}
          // onHideNav={() => this.toggleSideNav(false)}
          // onOpenNav={() => this.toggleSideNav(true)}
        />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
