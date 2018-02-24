import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


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

    loadQueue(){
        console.log("loading queue")
        fetch('http://localhost:9000/queue')
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

    render(){
        const alignIcons = {

    }

        return(          
            <div class="col-md">
                <div class="card text-secondary bg-primary text-center">
                    <div class="card-header">
                        <strong>Queue</strong>
                    </div>
                    <div class="card-body">
                        <BootstrapTable data={this.state.queue} striped hover headerStyle={{ display: 'none'}}>
                            <TableHeaderColumn class="col-hidden" width="60%" isKey dataField='Title'></TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            </div>   



            );
    }
}