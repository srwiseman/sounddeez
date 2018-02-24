import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


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
        return(<div class ="text-primary"><p class="text-primary" style={medText}><strong>{row.title}</strong></p><p class="text-primary" style={smallText}>{row.artist}</p><p class="text-primary" style={smallText}>{row.album}</p></div>
            )
    }

    resultsFormatterImage(cell, row){
        const searchImgStyle = {
            maxWidth: "100%"
        }
        return(
            <div style={{margin: '-0.75rem'}}>
                <img style={searchImgStyle} src={row.albumImage} alt="Album Art"/>
            </div>
            )
    }
    buttonFormatter(cell, row){
        return (
             <div class ="text-primary text-center"><a href="#/bosemain/search" onClick={() => this.props.playSearchedSong(row.id)}><i class="fas fa-play" ></i></a></div>

            )
    }
    addButtonFormatter(cell, row){
        return (
             <div class ="text-primary text-center"><a href="#/bosemain/search" onClick={() => this.props.addToQueue(row.id)}><i class="fas fa-plus-circle" ></i></a></div>

            )
    }

    render(){
        const alignIcons = {

    }

        return(          
            <div class="col-md-6">
    			<div class="card text-primary bg-secondary text-center">
    				<div class="card-header">
    					<strong>Search</strong>
    				</div>
    				<div class="card-body">
    					<input class="form-control" value={this.props.searchValue} onChange={this.props.handleSearchChange} />
    					<button class="btn" onClick={this.props.searchSongs}> Search </button>
    					<BootstrapTable data={this.props.results} striped hover headerStyle={{ display: 'none'}} options={{noDataText: 'Search for a Song!'}}>
    						<TableHeaderColumn width="20%"dataField='albumImage' dataFormat={this.resultsFormatterImage.bind(this)}></TableHeaderColumn>
    						<TableHeaderColumn width="60%" isKey dataField='full' dataFormat={this.resultsFormatter.bind(this)}></TableHeaderColumn>
    						<TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter.bind(this)}></TableHeaderColumn>
    						<TableHeaderColumn dataField="button" dataFormat={this.addButtonFormatter.bind(this)}></TableHeaderColumn>
    					</BootstrapTable>
    				</div>
    			</div>
    		</div>


            );
    }
}