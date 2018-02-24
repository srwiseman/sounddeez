import React from 'react';


export default class TopBar extends React.Component {

		constructor() {
    super();
    this.state ={
    	collapsed: "collapsed",
    }
  }

	render(){
		const smallText={
  			fontSize: "12px",
  			margin: "0",
  		}
  		const imgStyle = {
  			padding: "0",
  			maxWidth: "100%",
  		}
  		const nowPlayingPic={
  			padding: "0"
  		}

		return(

			<div>
			<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
    </ul>
  </div>
</nav>
			</div>
			);
	}
}