import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

import './App.css';
class App extends Component {
  constructor() {
    super();
    this.state = {
      chartData:{},
      data:[]
    };
  }

  componentDidMount() {
    this.getChartData();
    this.callApi();
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    body.express.map(response => this.setState({
      data:[...this.state.data, {"value":response.value, "date":response.date}]
    },function(){
      this.getChartData();
    }));
  };

  addData = async e => {
    e.preventDefault();

    const newValue = this.newValue.value;
    const newDate = this.newDate.value;

    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: {"value":newValue,"date":newDate} }),
    }).then();
    const body = await response.json();

    //resets the GET data before POST, because the server responds with whole data not just the addition
    this.setState({
      data:[]
    });

    body.express.map(response => this.setState({
      responseToPost: body,
      data:[...this.state.data,{"value":response.value, "date":response.date}]
    },function(){
      this.getChartData();
    }));

    this.addForm.reset();
  }

  getChartData(){

    this.state.data.sort(function (a,b){
        if(a.date < b.date){
          return -1;
        }
        if(a.date > b.date){
          return 1;
        }
        return 0;
    });

    var tableValues=[];
    var tableDates = [];

    this.state.data.map(function(value) {
        tableValues.push(value.value);
        tableDates.push(value.date);
    });


    this.setState({
      chartData:{
        labels:tableDates,
        datasets:[
          {
            label:'Value',
            data:tableValues,
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
      });
  }

render() {
    return (
      <div className="App">
      <Bar data={this.state.chartData} width={10} height={2} options={{maintainAspectRatio: true}}/>

      <form onSubmit={(e) => {this.addData(e)}} ref={input => this.addForm = input}>
        <input required type="number" id="newValue" ref={input => this.newValue = input} />
        <input required type="date" id="newDate" ref={input => this.newDate = input} />
        <button type="submit">Add</button>
      </form>
      </div>
    );
  }
}
export default App;
