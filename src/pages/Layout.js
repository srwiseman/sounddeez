import React from 'react';



export default class Layout extends React.Component {
  render(){

    const containerStyle = {
      marginTop: "60px"
    };
  	const title = "Welcome Steve!";
    return(
      <div class="container" style={containerStyle}>
    	<div class='duration'>
                {"37:46"}
                </div>
      </div>
    );
  }
}