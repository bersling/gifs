import { Component, OnInit, Input } from '@angular/core';

import * as d3 from 'd3';
import {ScaleLinear} from 'd3-scale';

@Component({
  selector: 'app-linfun',
  templateUrl: './linfun.component.html',
  styleUrls: ['./linfun.component.css']
})
export class LinfunComponent implements OnInit {

  result: string;

  // Configurable Inputs
  @Input() task: LinearGraphTask;
  @Input() width: number;
  @Input() xMax: number;
  @Input() xMin: number;
  @Input() circleRadius: number;

  // Feedback for the user once a result has been submitted.
  feedback: {
    status: string;
    message: string;
  };

  /**
   * Data Members. Persistence allows redrawing when parameters change (e.g. width of the plot).
   * The dataset holds points in the cartesian system, not to be confused with pixels!
   */
  dataset: Point[] = [];
  line; // the connection line between the points
  svg;
  padding = 10;
  constructor() { }

  ngOnInit() {
    const plotConfig: PlotConfig = new PlotConfig(
      this.width,
      this.xMax,
      this.xMin,
      this.padding,
      this.circleRadius
    );
    this.setup(plotConfig);
  }

  setup(plotConfig: PlotConfig) {

    const that = this;

    // create a new svg
    if (that.svg) {
      that.svg.remove();
    }
    const svg = that.svg = d3.select('#graph')
      .append('svg:svg');

    svg.attr('width', plotConfig.width)
      .attr('height', plotConfig.height);

    // plot cartesian
    const generateAxis = () => {

      /**
       * Generating the axis
       */
      const xAxis = d3.axisBottom(plotConfig.xScale);
      const yAxis = d3.axisLeft(plotConfig.yScale);

      /**
       * Drawing the x- and y-axis
       */
      const xAxisPlot = that.svg.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', 'translate(0,' + (plotConfig.height / 2) + ')')
        .call(xAxis);
      const yAxisPlot = that.svg.append('g')
        .attr('class', 'axis axis-y')
        .attr('transform', 'translate(' + (plotConfig.width / 2) + ',0)')
        .call(yAxis);

      /**
       * Drawing the grid lines
       */
      xAxisPlot.selectAll('.tick line')
        .attr('y1', (plotConfig.width - (2 * plotConfig.padding)) / 2 * -1)
        .attr('y2', (plotConfig.width - (2 * plotConfig.padding)) / 2 * 1);
      yAxisPlot.selectAll('.tick line')
        .attr('x1', (plotConfig.width - (2 * plotConfig.padding)) / 2 * -1)
        .attr('x2', (plotConfig.width - (2 * plotConfig.padding)) / 2 * 1);
    };
    generateAxis();

    /**
     * Groups for the items to be drawn.
     * That way, the circles are always above the lines.
     * If the lines would be above the circles, it would interfere with the dragging behaviour.
     */
    svg.append('g').attr('id', 'line-group');
    svg.append('g').attr('id', 'circle-group');

    const dragBehaviour = this.generateDragBehaviour(svg, plotConfig);
    that.setupClick(svg, plotConfig, dragBehaviour);
    that.drawCircles(svg, plotConfig, dragBehaviour);
    that.drawLine(svg, plotConfig, that.dataset[0], that.dataset[1]);
  }

  setupClick(svg, plotConfig: PlotConfig, drag) {
    const that = this;
    svg.on('click', function() {

      if (Object.keys(that.dataset).length < 2) {

        /**
         * Coordinate Origin: Top left of svg;
         * [25, 6] means 25px to right and 6px below origin
         */
        const clickedPoint: number[] = d3.mouse(this);

        // Normally we go from data to pixels, but here we're doing pixels to data
        const newData = {
          x: Math.round(plotConfig.xScale.invert(clickedPoint[0])), // Takes the pixel number to convert to number
          y: Math.round(plotConfig.yScale.invert(clickedPoint[1]))
        };

        that.dataset.push(newData);   // Push data to our array

        that.drawCircles(svg, plotConfig, drag);

        if (Object.keys(that.dataset).length === 2) {
          that.drawLine(svg, plotConfig, that.dataset[0], that.dataset[1]);
        }

      }

    });
  }


  /**
   * Expected dragging behavior:
   * Should 'hop' (= move discontinuously) to the nearest point in the coordinate grid
   */
  generateDragBehaviour(svg, plotConfig: PlotConfig) {

    const that = this;
    const drag = d3.drag();

    // Helper
    const getClosestPoint = (point: Point): Point => {
      return new Point(Math.round(point.x), Math.round(point.y));
    };

    /* point starts at {x: dataPointX, y: dataPointY} and then moves according to translation rules */
    drag.on('drag', function(dataPoint: Point, circleNumber: number) {

      // old closest point.
      // performance could be optimized by not calculating oldPoint every time if unchanged.
      const oldClosestPoint = getClosestPoint(dataPoint);

      // changes since last drag event in x and y direction in pixel
      const pixelDx = d3.event.dx;
      const pixelDy = d3.event.dy;

      // changes since last drag converted to scale
      dataPoint.x = plotConfig.xScale.invert(plotConfig.xScale(dataPoint.x) + pixelDx);
      dataPoint.y = plotConfig.yScale.invert(plotConfig.yScale(dataPoint.y) + pixelDy);

      const newClosestPoint = getClosestPoint(dataPoint);

      if (!that.pointsAreEqual(oldClosestPoint, newClosestPoint) && that.pointIsOnGrid(newClosestPoint, plotConfig)) {
        d3.select(this).attr('cx', plotConfig.xScale(newClosestPoint.x));
        d3.select(this).attr('cy', plotConfig.yScale(newClosestPoint.y));
        const untouchedPoint = that.dataset[(circleNumber + 1) % 2];
        that.drawLine(svg, plotConfig, newClosestPoint, untouchedPoint);
      }

    });

    drag.on('end', function(dataPoint: Point) {

      const newClosestPoint = getClosestPoint(dataPoint);

      /**
       * Could be simplified since only the else clause would work,
       * but like this the logic is more extensible / modifiable
       */
      if (that.pointIsOnGrid(newClosestPoint, plotConfig)) {
        dataPoint.x = newClosestPoint.x;
        dataPoint.y = newClosestPoint.y;
      } else {
        if (newClosestPoint.x > plotConfig.xMax) {
          dataPoint.x = plotConfig.xMax;
        } else if  (newClosestPoint.x < plotConfig.xMin) {
          dataPoint.x = plotConfig.xMin;
        } else {
          dataPoint.x = newClosestPoint.x;
        }
        if (newClosestPoint.y > plotConfig.yMax) {
          dataPoint.y = plotConfig.yMax;
        } else if  (newClosestPoint.y < plotConfig.yMin) {
          dataPoint.y = plotConfig.yMin;
        } else {
          dataPoint.y = newClosestPoint.y;
        }
      }
      d3.select(this).attr('cx', plotConfig.xScale(dataPoint.x));
      d3.select(this).attr('cy', plotConfig.yScale(dataPoint.y));
      that.drawLine(svg, plotConfig, that.dataset[0], that.dataset[1]);


    });
    return drag;
  }

  drawCircles(svg, plotConfig: PlotConfig, drag) {
    const that = this;
    svg.select('#circle-group').selectAll('circle')
      .data(that.dataset)
      .enter()
      .append('circle')
      .call(drag)
      .attr('r', plotConfig.radius)
      .attr('cx', d => plotConfig.xScale(d.x))
      .attr('cy', d => plotConfig.yScale(d.y))
      .classed('circle', true);
  }

  /**
   * Drawing a connection line between the points
   */
  drawLine(svg, plotConfig: PlotConfig, pointA, pointB) {

    const that = this;

    if (pointA && pointB) {

      const slope = that.getSlope(pointA, pointB);
      const offset = that.getOffset(pointA, pointB);

      const gridIntersectionPoints = this.calculateGridIntersectionPoints(plotConfig, slope, offset);

      if (that.line) {
        that.line.remove();
      }
      const lineGroup = svg.select('#line-group');

      if (typeof slope === 'number') {
        that.line = lineGroup.append('line')          // attach a line
          .attr('x1', plotConfig.xScale(gridIntersectionPoints[0].x))     // x position of the first end of the line
          .attr('y1', plotConfig.yScale(gridIntersectionPoints[0].y))      // y position of the first end of the line
          .attr('x2', plotConfig.xScale(gridIntersectionPoints[1].x))     // x position of the second end of the line
          .attr('y2', plotConfig.yScale(gridIntersectionPoints[1].y))    // y position of the second end of the line
          .style('stroke-width', 2)
          .classed('connection-line', true);
      } else if (slope === 'infiniteSlope') {
        that.line = lineGroup.append('line')          // attach a line
          .attr('x1', plotConfig.xScale(pointA.x))     // x position of the first end of the line
          .attr('y1', plotConfig.yScale(plotConfig.xMin))      // y position of the first end of the line
          .attr('x2', plotConfig.xScale(pointA.x))     // x position of the second end of the line
          .attr('y2', plotConfig.yScale(plotConfig.xMax))    // y position of the second end of the line
          .style('stroke-width', 2)
          .classed('connection-line', true);
      }

    }
  }

  getSlope = (pointA: Point, pointB: Point) => {
    if (pointB.x === pointA.x && pointB.y === pointA.y) {
      return 'isPoint';
    } else if (pointB.x === pointA.x) {
      return 'infiniteSlope';
    } else {
      return (pointB.y - pointA.y) / (pointB.x - pointA.x);
    }
  }

  getOffset = (pointA: Point, pointB: Point): number => {
    const slope = this.getSlope(pointA, pointB);
    if (typeof slope === 'number') {
      return pointA.y - pointA.x * slope;
    } else {
      return NaN;
    }
  }

  linearFunction = (x, slope, offset) => {
    return x * slope + offset;
  }

  /**
   * If y = x * slope + offset, then x = (y - offset) / slope
   * precondition: slope must not be zero
   */
  inverseLinearFunction = (y, slope, offset) => {
    return (y - offset) / slope;
  }

  /**
   * In order to draw a line that stops exactly on the grid, the grid intersection with the line is calculated
   */
  calculateGridIntersectionPoints (plotConfig: PlotConfig, slope, offset): [Point, Point] {

    const getIntersectionPoint = (x: 'xMax' | 'xMin'): Point => {
      const y = this.linearFunction(plotConfig[x], slope, offset);
      if (y > plotConfig.yMax) {
        return new Point(
          this.inverseLinearFunction(plotConfig.yMax, slope, offset),
          plotConfig.yMax
        );
      } else if ( y < plotConfig.yMin) {
        return new Point(
          this.inverseLinearFunction(plotConfig.yMin, slope, offset),
          plotConfig.yMin
        );
      } else {
        return new Point(
          plotConfig[x],
          y
        );
      }
    };

    return [getIntersectionPoint('xMin'), getIntersectionPoint('xMax')];

  }

  pointsAreEqual(pointA: Point, pointB: Point): boolean {
    return pointA.x === pointB.x && pointA.y === pointB.y;
  }

  pointIsOnGrid(point: Point, plotConfig: PlotConfig): boolean {
    return plotConfig.xMin <=  point.x && point.x  <= plotConfig.xMax &&
      plotConfig.yMin <=  point.y && point.y <= plotConfig.yMax;
  }

}

class PlotConfig {

  // scales DATA to PIXEL
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  height;

  constructor(
    public width: number,
    public xMax: number,
    public xMin: number,
    public padding: number,
    public radius: number
  ) {
    this.height = this.width;
    this.xScale = d3.scaleLinear().domain([xMax, xMin]).range([width - padding, padding]);
    this.yScale = d3.scaleLinear().domain([xMin, xMax]).range([this.height - padding, padding]);
  }

  /**
   * Ymin and Ymax currently need to be equal to xMin and Xmax since we need a square
   */
  get yMin(): number {
    return this.xMin;
  }
  get yMax(): number {
    return this.xMax;
  }

  /**
   * For example for a square grid (which is required at the moment) the slope is 1
   */
  get gridSlope(): number {
    return (this.yMax - this.yMin) / (this.xMax - this.xMin);
  }

}


export interface Task {
  type: string;
  title: string;
  description: string;
  solutionDescription?: string; // "Lösungsweg"
}

export interface LinearGraphTask extends Task {
  solution: {
    A: Point,
    B: Point
  };
}

class Point {
  constructor(
    public x,
    public y
  ) {}
}
