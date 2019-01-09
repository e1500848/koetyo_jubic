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
      startDate: new Date(),
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
    this.handleChange = this.handleChange.bind(this);
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

  addData2(e){
    e.preventDefault();

    const newValue = this.newValue2.value;
    const newDate = this.newDate2.value;

    this.setState({
      data: [...this.state.data, {"value":newValue,"date":newDate}]
    }, function(){
      this.getChartData();
    });

    this.addForm2.reset();
  }

  newForm(){
    console.log('clicked');
    return (
      <form onSubmit={(e) => {this.addData2(e)}} ref={input => this.addForm2 = input}>
        <input required type="number" id="newValue" ref={input => this.newValue2 = input} />
        <input required type="date" id="newDate" ref={input => this.newDate2 = input} />

        <button type="submit">Add</button>
        <button type="button" onClick={this.deleteForm.bind(this)}>Remove form</button>
      </form>
    );
  }

  _onButtonClick(){
    this.setState({
      showForm: true
    });
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  deleteForm(){
    this.setState({
      showForm: false
    });
  }

  render() {
  		return (
        <React.Fragment>
          <Bar data={this.state.chartData} width={10} height={2} options={{maintainAspectRatio: true}}/>

          <form onSubmit={(e) => {this.addData(e)}} ref={input => this.addForm = input}>
            <input required type="number" id="newValue" ref={input => this.newValue = input} />
            <input required type="date" id="newDate" ref={input => this.newDate = input} />
            <button type="submit">Add</button>

          </form>
          {this.state.showForm ? this.newForm() : null}
          <button onClick={this._onButtonClick.bind(this)}>new form</button>

        </React.Fragment>
  		);
  	}
}

const mapStateToProps = (state: ApplicationState) => ({
  text: state.text
})

export default connect(mapStateToProps)(KoeTyo)
