import React from "react";
import { Link } from "react-router-dom";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const featuredClass = location.pathname === "/" ? "active" : "";
    const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggler" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Steve Home</a>
          </div>
          <div class={"navbar-collapse " + navClass} id="navbar">
            <ul class="nav navbar-nav">
              <li class={featuredClass}>
                <Link to="/" class="nav-link" onClick={this.toggleCollapse.bind(this)}>Featured</Link>
              </li>
              <li class={archivesClass}>
                <Link to="bosemain" class="nav-link" onClick={this.toggleCollapse.bind(this)}>Bose</Link>
              </li>
              <li class={settingsClass}>
                <Link to="settings" class="nav-link" onClick={this.toggleCollapse.bind(this)}>Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}