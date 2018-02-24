import React from 'react';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import BottomBar from'../components/BottomBar'
import TopBar from'../components/TopBar'
import Search from '../components/Search'
import Queue from '../components/Queue'
import {
  HashRouter,
  Route,
  Link,
} from 'react-router-dom';

import { slide as Menu } from 'react-burger-menu'


export default class BoseMain extends React.Component {
	constructor(props) {
    super(props);
    this.state = { menuOpen: false };
    this.state.results = [];
    this.state.controllerIP = "http://localhost:9000"

  }
  closeMenu () {
    this.setState({menuOpen: false});
  }
  playSearchedSong(songID){
  		console.log(this.state.controllerIP+'/play/'+songID);
  		fetch(this.state.controllerIP+'/play/'+songID);
  }
  addToQueue(songID){
  		console.log(this.state.controllerIP+'/add/'+songID);
  		fetch(this.state.controllerIP+'/add/'+songID);
  }
  nextSong() {
		console.log("NEXT SONG")
		fetch(this.state.controllerIP+'/next_track');
	}
	powerToggle() {
		fetch(this.state.controllerIP+'/power');
	}
  	loadData() {
		fetch(this.state.controllerIP+'/')
			.then(response => response.json())
			.then(data => {
				this.setState({data: data })
				this.setState({song: this.state.data.nowPlaying.track});
				this.setState({album: this.state.data.nowPlaying.album});
				this.setState({artist: this.state.data.nowPlaying.artist});
				this.setState({art: this.state.data.nowPlaying.art['#content']});
		})
			.catch(err => console.error(this.props.url, err.toString()))
	}
	searchSongs(){
		var searchString = this.state.searchValue.replace(/ /g, "_")
		this.setState({results: []});
		fetch(this.state.controllerIP+'/search/'+searchString)
			.then(response => response.json())
			.then(data => {
				data.data.forEach((obj, index) =>{
					//console.log(obj);
					this.state.results.push({id: obj.id,
						                     artist: obj.artist.name,
						                     title: obj.title,
						                     album: obj.album.title,
						                     albumImage: obj.album.cover,
						                     full: obj.title+"-"+obj.artist.name+"-"+obj.album.title
					                         });
				});
		})
			.catch(err => console.error(this.props.url, err.toString()))
		
	}
  	componentDidMount() {
		this.loadData()
		//console.log(this.state);
		this.timerID = setInterval(
      		() => this.loadData(),
      		5000
    	);
	}
	handleSearchChange(event){
		this.setState({searchValue: event.target.value});
	}
	buttonFormatter(cell, row){
        return (
        	 <a href="#/bosemain" onClick={() => this.playSearchedSong(row.id)}><i class="fas fa-play fa-2x" ></i></a>

        	)
    }
    addButtonFormatter(cell, row){
        return (
        	 <a href="#/bosemain" onClick={() => this.addToQueue(row.id)}><i class="fas fa-plus-circle fa-2x" ></i></a>

        	)
    }



    resultsFormatter(cell, row){
    	const smallText={
  			fontSize: "10px",
  			margin: "0",
  		}
  		const medText={
  			fontSize: "15px",
  			margin: "0",
  		}
    	return(<div class ="text-primary"><p class="text-primary" style={medText}><strong>{row.title}</strong></p><p class="text-primary" style={smallText}>{row.artist}</p><p class="text-primary" style={smallText}>{row.album}</p></div>
    		)
    }
	
    resultsFormatterImage(cell, row){
    	const searchImgStyle = {
    		maxWidth: "100%"
    	}
    	return(
    		<div style={{margin: '-0.75rem'}}>
    			<img style={searchImgStyle} src={row.albumImage}/>
    		</div>
    		)
    }

  render(){
  	const title = "Welcome Steve!";


  	var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '36px',
    left: '5vw',
    top: '3vh'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}


    return(
    	<div>
    	         <Menu isOpen={this.state.menuOpen} width={ '300px' } styles={ styles }>
    	          <a onClick={() => this.closeMenu()} id="about" className="menu-item button" href="/#/bosemain/search"><i class="fas fa-search"></i><span>Search</span></a>
    	           <a onClick={() => this.closeMenu()}  id="home" className="menu-item button" href="/#/bosemain/queue" style={{ display: "block"}}><i class="fas fa-list-ul"></i><span>Queue</span></a>
        		   

      </Menu>

    <div class="content">

    	<HashRouter>
	    	<div>
	    	
	    	<Route path="/bosemain/queue" component={Queue}>
	    	</Route>
	    	<Route exact path="/bosemain/search" render={()=> <Search searchValue={this.state.searchValue} handleSearchChange={this.handleSearchChange.bind(this)} searchSongs={this.searchSongs.bind(this)} results={this.state.results}
	    			addToQueue={this.addToQueue.bind(this)} playSearchedSong={this.playSearchedSong.bind(this)}></Search>} >
	    		
	    	</Route>
	    	</div>
    	</HashRouter>
    	<TopBar artist={this.state.artist} album={this.state.album} song={this.state.song} art={this.state.art}></TopBar>
    	<BottomBar nextSong={this.nextSong.bind(this)} powerToggle={this.powerToggle.bind(this)}></BottomBar>
    </div>
    </div>
    );
  }
}