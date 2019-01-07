//@flow
import React from "react";
import {Chart} from "./Chart"

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
      chartData:{
        labels: ['2018-10-30T12:34:21.184Z',
        '2018-10-30T13:34:21.184Z',
        '2018-10-30T14:34:21.184Z',
        '2018-10-30T15:34:21.184Z',
        '2018-10-30T16:34:21.184Z',
        '2018-10-30T17:34:21.184Z'],
        datasets:[
          {
            label:'Data',
            data:[
              26,
              59,
              16,
              9,
              73,
              18
            ],
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
    }
  }

  render() {
  		return (
        <React.Fragment>
          <Chart chartData={this.state.chartData} titleText="BAR CHART" legendPosition="bottom"/>

          <form>
            <input type="text" id="newValue"/>
            <input type="text" id="newDate"/>
            <button type="submit">Add</button>
          </form>
        </React.Fragment>
  		);
  	}

}

const mapStateToProps = (state: ApplicationState) => ({
  text: state.text
})

export default connect(mapStateToProps)(KoeTyo)
