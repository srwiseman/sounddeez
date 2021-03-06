import React from 'react';
import DropdownMenu from 'react-dd-menu';

export default class TopBar extends React.Component {

	imgStyle = {
  			padding: "0",
  			maxWidth: "100%",
  			height: "12vh",
  			float: "right",
  		}

	imageHandler(){
  			if (this.props.art != undefined){
  				return (
  					<img style={this.imgStyle} src={this.props.art} alt="art"/>
  					)
  			}
  		}

	render(){
		const smallText={
  			fontSize: "2vh",
  			margin: "0",
  		}
  		const imgStyle = {
  			padding: "0",
  			maxWidth: "100%",
  			height: "12vh",
  			float: "right",
  		}

  		

		return(
			<div class="s-top-bar">
					<div class="row">
						<div class="col-sm-3 col-3 bg-primary">
						</div>
						<div class="col-sm-6 col-6 bg-primary" style={{height: "12vh"}}>
							<div class="nowPlayingText"><p style={smallText}><strong>NOW PLAYING</strong></p><p style={smallText}>{this.props.artist}</p><p style={smallText}>{this.props.album}</p><p style={smallText}><strong>{this.props.song}</strong></p></div>
						</div>
						<div class="col-sm-3 col-3 bg-primary">
							{this.imageHandler()}
						</div>
					</div>

			</div>
			);
	}
}