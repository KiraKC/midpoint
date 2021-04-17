// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { Bar, ResponsiveBar } from '@nivo/bar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
import '../../styles/StatsPage/StatsBottomPanel.css'
import React from 'react';
import AutoSizer from "react-virtualized-auto-sizer";

interface IBarChartProps {
	chartData: any,
	grouping: string
}

function BarChart(props: IBarChartProps) {

	const theme = {
		background: "transparent",
		axis: {
			fontSize: "15px",
			ticks: {
				line: {
					stroke: "#555555"
				},
				text: {
					fill: "#ffffff",
					fontSize: "15px"
				}
			},
			legend: {
				text: {
					fill: "#aaaaaa"
				}
			}
		},
		grid: {
			line: {
				fontSize: "15px",
				stroke: "#555555"
			}
		}
	};

	return (
		<div className="barchart-wrapper">
			<div className="barchart-heading">Categorized by <code>{props.grouping}</code></div>
			<ResponsiveBar
				enableLabel={false}
				enableGridX={true}
				enableGridY={true}
				data={props.chartData.stats}
				keys={props.chartData.identities}
				indexBy="answerOptionValue"
				margin={{ top: 40, right: 20, bottom: 140, left: 50 }}
				padding={0.3}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={{ scheme: 'paired' }}
				theme={theme}
				defs={[
					{
						id: 'dots',
						type: 'patternDots',
						background: 'inherit',
						color: '#38bcb2',
						size: 4,
						padding: 1,
						stagger: true
					},
					{
						id: 'lines',
						type: 'patternLines',
						background: 'inherit',
						color: '#eed312',
						rotation: -45,
						lineWidth: 6,
						spacing: 10
					}
				]}
				fill={[
					{
						match: {
							id: 'fries'
						},
						id: 'dots'
					},
					{
						match: {
							id: 'sandwich'
						},
						id: 'lines'
					}
				]}
				borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 12,
					tickPadding: 5,
					tickRotation: 50,
					legendPosition: 'middle',
					legendOffset: 32
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legendPosition: 'middle',
					legendOffset: -40,
				}}
				borderRadius={5}
				labelSkipWidth={200}
				labelSkipHeight={12}
				labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
			/>
		</div>
	)
}

export default BarChart;