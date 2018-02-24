import React from 'react';



export default class Layout extends React.Component {
  render(){

    const containerStyle = {
      marginTop: "60px"
    };
  	const title = "Welcome Steve!";
    return(
      <div class="container" style={containerStyle}>
    	<h1>wow</h1>
      </div>
    );
  }
}