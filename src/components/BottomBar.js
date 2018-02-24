import React from 'react';


export default class BottomBar extends React.Component {

	render(){
		const alignIcons = {

  	}
		return(


		<div class="s-bottom-bar bg-primary">
			<div class="container h-100">
				<div class="row h-100">
					<div class="col-sm-1 col-3">
						<div class="powerDiv text-center">
							<a href="#/bosemain" onClick={this.props.powerToggle}><i class="fas fa-power-off fa-2x"></i></a>
						</div>
					</div>
					<div class="col-sm-1 col-3">
						<div class="colDownDiv text-center">
							<a href="#/bosemain" onClick={this.props.nextSong}><i class="fas fa-volume-down fa-2x"></i></a>
						</div>
					</div>
					<div class="col-sm-1 col-3">
						<div class="colUpDiv text-center">
							<a href="#/bosemain" onClick={this.props.nextSong}><i class="fas fa-volume-up fa-2x"></i></a>
						</div>
					</div>
					<div class="col-sm-1 col-3" style={alignIcons}>
						<div  class="nextSongDiv text-center" >
							<a href="#/bosemain" onClick={this.props.nextSong}><i class="fas fa-step-forward fa-2x"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>

			);
	}
}