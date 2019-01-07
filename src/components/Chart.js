import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

export class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData:props.chartData
		}
	}

	static defaultProps = {
		displayTitle:true,
		displayLegend:true,
		legendPosition:'right',
		location:'City'
	}

	render() {
		return (
		<div>
		<Bar
		data = {this.state.chartData}
		width = {10}
		height = {250}
		options = {{
			title:{
				display:this.props.displayTitle,
				text:this.props.titleText,
				fontSize:25
			},
			legend:{
				display:this.props.displayLegend,
				position:this.props.legendPosition
			},
			maintainAspectRatio:false
		}}
		/>
		</div>
		)
	}
}

export default Chart;
