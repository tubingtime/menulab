import { useToken } from "@/lib/SessionManagement";
import React, { Fragment, useEffect, useRef, useState } from "react";
import * as d3 from "d3"
import { ScaleLinear } from "d3";

interface PlotData {

}

function createLineGraph(data, {
  chartRef,
  x = ([x]) => x, // given d in data, returns the (temporal) x-value
  y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
  defined, // for gaps in data
  curve = d3.curveLinear, // method of interpolation between points
  marginTop = 20, // top margin, in pixels
  marginRight = 30, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  xType = d3.scaleUtc, // the x-scale type
  xDomain, // [xmin, xmax]
  xRange = [marginLeft, width - marginRight], // [left, right]
  yType = d3.scaleLinear, // the y-scale type
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  yFormat = null, // a format specifier string for the y-axis
  yLabel = "Sales ($)", // a label for the y-axis
  color = "currentColor", // stroke color of line
  strokeLinecap = "round", // stroke line cap of the line
  strokeLinejoin = "round", // stroke line join of the line
  strokeWidth = 1.5, // stroke width of line, in pixels
  strokeOpacity = 1, // stroke opacity of line
}: any) {
  // Compute values.

  const X = d3.map(data, x) as any[]; 
  const Y = d3.map(data, y) as any[];
  const I = d3.range(X.length) as any[];

  // Compute default domains.
  if (xDomain === undefined) xDomain = d3.extent(X);
  if (yDomain === undefined) yDomain = [0, d3.max(Y)];


  // Construct scales and axes.
  const xScale = d3.scaleUtc(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3.axisBottom(xScale).ticks(width / 160).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

  // Construct a line generator.
  const line = d3.line()
      .curve(curve)
      .x(i => xScale(X[i]))
      .y(i => {
        return yScale(Y[i]);
      });

  const svgElem = d3.select(chartRef.current);

  const svg = svgElem
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", marginTop - 20)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel));

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-opacity", strokeOpacity)
      .attr("d", line(I));

  return svg.node();
}


const LineGraph = (plotData) => {
  const chartRef = useRef(null);

  const jwtToken = useToken();



  const sampleData = [
    { "date": new Date("2007-04-23"), "sales": 1286.81, "menu_name": "Academic Coffee" },
    { "date": new Date("2007-04-24"), "sales": 1153.92, "menu_name": "Academic Coffee" },
    { "date": new Date("2007-04-25"), "sales": 1255.06, "menu_name": "Academic Coffee" },
    { "date": new Date("2007-04-26"), "sales": 1106.88, "menu_name": "Academic Coffee" },
    { "date": new Date("2007-04-27"), "sales": 1107.34, "menu_name": "Academic Coffee" },
    { "date": new Date("2007-04-28"), "sales": 1208.74, "menu_name": "Academic Coffee" },
    { "date": new Date("2007-04-29"), "sales": 1309.36, "menu_name": "Academic Coffee" },
  ]
  

  useEffect(() => {
    createLineGraph(sampleData, {
      chartRef: chartRef,
      x: (entry) => entry.date,
      y: (entry) => entry.sales,
      yLabel: "↑ Change in price ($USD)",
      color: "steelblue",
      width: 800,
      marginTop: 40,
      marginLeft:  70
    });
  }, []);
  

  return (
    <Fragment>
      <div class="graph">
        <svg ref={chartRef}></svg>
      </div>
    </Fragment >
  );
};

export default LineGraph;
