//@flow
import React from "react";
import {Bar} from 'react-chartjs-2';

import { connect } from 'react-redux'

import { setText } from '../actions'

import type { Dispatch } from 'redux'

import type { ApplicationState } from '../reducer'

type Props = {
  text: string,
  dispatch: Dispatch
}

class KoeTyo extends React.PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      showForm: false,
      chartData:{},
      data:[
        {
        "value":26,
        "date":'2018-10-30T12:34:21.184Z'
        },
        {
        "value":5,
        "date":'2018-10-30T09:34:21.184Z'
        },
        {
        "value":3,
        "date":'2018-10-30T20:34:21.184Z'
        },
        {
        "value":17,
        "date":'2018-10-30T15:34:21.184Z'
        }
      ]
    }

  }

  componentWillMount() {
		this.getChartData();
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

  addData(e){
    e.preventDefault();

    const newValue = this.newValue.value;
    const newDate = this.newDate.value;

    this.setState({
      data: [...this.state.data, {"value":newValue,"date":newDate}]
    }, function(){
      this.getChartData();
    });

    this.addForm.reset();
  }

  newForm(){
    console.log('clicked');
    return (
      <form onSubmit={(e) => {this.addData(e)}} ref={input => this.addForm = input}>
        <input required type="number" id="newValue" ref={input => this.newValue = input} />
        <input required type="text" id="newDate" ref={input => this.newDate = input} />
        <button type="submit">Add</button>
      </form>
    );
  }

  _onButtonClick(){
    this.setState({
      showForm: true
    });
  }

  render() {
  		return (
        <React.Fragment>
          <Bar data={this.state.chartData} width={10} height={250} options={{maintainAspectRatio: false}}/>

          <form onSubmit={(e) => {this.addData(e)}} ref={input => this.addForm = input}>
            <input required type="number" id="newValue" ref={input => this.newValue = input} />
            <input required type="text" id="newDate" ref={input => this.newDate = input} />
            <button type="submit">Add</button>
          </form>
          <button onClick={this._onButtonClick.bind(this)}>new form</button>
          {this.state.showForm ? this.newForm() : null}
        </React.Fragment>
  		);
  	}
}

const mapStateToProps = (state: ApplicationState) => ({
  text: state.text
})

export default connect(mapStateToProps)(KoeTyo)
