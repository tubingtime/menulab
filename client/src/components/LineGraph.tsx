import React, { Fragment, useEffect, useRef } from "react";
import * as d3 from "d3"

function createLineGraph(data, {
  chartRef,
  x = ([x]) => x, // given d in data, returns the (temporal) x-value
  y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
  catagoryFunc = (c) => c.catagory, // given d in data, returns the catagorical value
  defined, // for gaps in data
  curve = d3.curveLinear, // method of interpolation between points
  marginTop = 20, // top margin, in pixels
  marginRight = 30, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  legendSpace = 20,
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
  const catagories = d3.group(data, catagoryFunc);

  // Compute default domains.
  if (xDomain === undefined) xDomain = d3.extent(X);
  if (yDomain === undefined) yDomain = [0, d3.max(Y)];


  // Construct scales and axes.
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  const xAxis = d3.axisBottom(xScale).ticks(width / 160).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);


  // Construct a line generator.
  const line = d3.line()
    .curve(curve)
    .x(d => xScale(x(d)))
    .y(d => yScale(y(d)));

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
  let i = -1;
  catagories.forEach(function (d) {
    i++;
    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", colorScale(d))
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-opacity", strokeOpacity)
      .attr("d", line(d));

    // Add a label
    const labelX = ((i * 200) + (legendSpace));
    const labelY = (height - (marginBottom - 30));
    const label = svg.append("g")
      .attr("transform", `translate(${labelX}, ${labelY})`);
    label.append("text")
      .attr("x", legendSpace + 5)
      .attr("y", legendSpace / 1.25)
      .style("fill", function () { // Add the colours dynamically
        return d.color = colorScale(d);
      })
      .text(catagoryFunc(d[0]));
    label.append("rect")
      .attr('width', legendSpace)
      .attr('height', legendSpace)
      .style("fill", function () { // Add the colours dynamically
        return d.color = colorScale(d);
      })
      .text(catagoryFunc(d[0]));



  })


  return svg.node();
}


export default function LineGraph(plotData) {
  const chartRef = useRef(null);




  useEffect(() => {
    createLineGraph(plotData.plotData, {
      chartRef: chartRef,
      x: (entry) => entry.date,
      y: (entry) => entry.sales,
      catagoryFunc: (entry) => entry.name,
      yLabel: "Sales ($USD)",
      color: "steelblue",
      width: 800,
      marginTop: 40,
      marginLeft: 60,
      marginBottom: 50
    });
  }, []);


  return (
    <Fragment>
      <div className="graph">
        <svg ref={chartRef}></svg>
      </div>
    </Fragment >
  );
};

