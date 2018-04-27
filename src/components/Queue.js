import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import FadeIn from 'react-fade-in';


export default class Queue extends React.Component {
    constructor() {
    super();
    this.state = { count: 0 };
    this.state.results = []
    this.timerID = setInterval(
            () => this.loadQueue(),
            2000
        );
  }

  componentWillUnmount(){
    clearInterval(this.timerID)
  }

    loadQueue(){
        console.log("loading queue")
        fetch('http://192.168.0.16:9000/queue')
            .then(response => response.json())
            .then(data => {
                this.setState({queue: data });

        })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    componentDidMount() {
        this.loadQueue();
        //console.log(this.state);
        
    }
    artistFormatter(cell, row) {
        return (
             <div class="text-primary"><p style={{fontSize: "3vw", margin: "0"}}><span>{row.Artist.Name}</span></p>
             <p style={{fontSize: "3vw", margin: "0"}}><span>{row.Title}</span></p>
             </div>

            )
    }
    coverFormatter(cell, row){
        const imgStyle = {
            maxWidth: "100%"
        }
        return(
            <div>
                <img style={imgStyle} src={row.Album.Cover} alt="Album Art"/>
            </div>
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
                        <strong style={{color: "#cccccc"}}>Queue</strong>
                    </div>
                    <div class="card-body">
                        <BootstrapTable data={this.state.queue} striped hover headerStyle={{ display: 'none'}}>
                            <TableHeaderColumn class="col-hidden" width="20%" dataFormat={this.coverFormatter.bind(this)} isKey dataField='Title'></TableHeaderColumn>
                            <TableHeaderColumn class="col-hidden" width="80%" dataFormat={this.artistFormatter.bind(this)}></TableHeaderColumn>


                        </BootstrapTable>
                    </div>
                </div>
                </FadeIn>
                
            </div>   



            );
    }
}