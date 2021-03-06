import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import FadeIn from 'react-fade-in';


export default class Search extends React.Component {

    resultsFormatter(cell, row){
        const smallText={
            fontSize: "10px",
            margin: "0",
        }
        const medText={
            fontSize: "10px",
            margin: "0",
        }
        return(<div class ="text-primary"><p style={medText}><strong>{row.title}</strong></p><p style={smallText}>{row.artist}</p><p style={smallText}>{row.album}</p></div>
            )
    }

    resultsFormatterImage(cell, row){
        const searchImgStyle = {
            maxWidth: "100%"
        }
        return(
            <div>
                <img style={searchImgStyle} src={row.albumImage} alt="Album Art"/>
            </div>
            )
    }
    buttonFormatter(cell, row){
        return (
             <div class ="text-center"><a href="#/bosemain/search" onClick={() => this.props.playSearchedSong(row.id)}><i class="fas fa-play" ></i></a></div>

            )
    }
    addButtonFormatter(cell, row){
        return (
             <div class ="text-center"><a href="#/bosemain/search" onClick={() => this.props.addToQueue(row.id)}><i class="fas fa-plus-circle" ></i></a></div>

            )
    }

    render(){
        const alignIcons = {

    }

        return(          
            <div class="col-md-6">
            <FadeIn>
    			<div class="card bg-primary text-center">
    				<div class="card-header">
    					<strong style={{color: "#cccccc"}}>Search</strong>
    				</div>
    				<div class="card-body">
    					<input class="form-control" value={this.props.searchValue} onChange={this.props.handleSearchChange} />
    					<button class="btn" onClick={this.props.searchSongs}> <i class="fas fa-search"></i> Search </button>
    					<BootstrapTable data={this.props.results} striped hover headerStyle={{ display: 'none'}} options={{noDataText: 'Search for a Song!'}}>
    						<TableHeaderColumn width="20%"dataField='albumImage' dataFormat={this.resultsFormatterImage.bind(this)}></TableHeaderColumn>
    						<TableHeaderColumn width="60%" isKey dataField='full' dataFormat={this.resultsFormatter.bind(this)}></TableHeaderColumn>
    						<TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter.bind(this)}></TableHeaderColumn>
    						<TableHeaderColumn dataField="button" dataFormat={this.addButtonFormatter.bind(this)}></TableHeaderColumn>
    					</BootstrapTable>
    				</div>
    			</div>
                </FadeIn>
    		</div>


            );
    }
}