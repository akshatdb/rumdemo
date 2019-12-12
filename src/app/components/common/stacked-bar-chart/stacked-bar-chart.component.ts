import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements OnInit {

  constructor() { }
  @ViewChild('chart', { static: false })
  private chartContainer: ElementRef;

  @Input()
  model: any;

  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  labelKey;
  valueKey;
  stackOrder = [];
  data = [];

  ngOnInit(){

  }
  ngOnChanges() {
    if (!this.model) { return; }
    this.labelKey = this.model.label;
    this.valueKey = this.model.value;
    this.stackOrder = this.model.stackOrder;
    this.data = this.model.data;
    if (this.chartContainer)
      this.createChart();
  }
  ngAfterViewInit() {
    if (this.chartContainer && this.model)
      this.createChart();
  }

  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = this.data;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight).append("g");
    const dataIntermediate = this.stackOrder.map((stackKey) => {
      return data.map((row) => {
        return { x: row[this.labelKey], y: row[stackKey] };
      });
    })
    let sumList;
    const stackedData = dataIntermediate.map(row => {
      if(!sumList)
        sumList = row.map(row => 0);
      let i = 0;
      let newObj = row.map(innerRow => {
        i++;
        let obj = {
          x: innerRow.x,
          y0: sumList[i],
          y: innerRow.y
        }
      });
      for(let i = 0; i < row.length; i++){
        sumList[i] = sumList[i]?0:sumList[i] + row[i];
      }
      return newObj;
    })

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    var color = d3.schemeCategory10;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(stackedData[0].map(d => d['x']));

    var xAxis = d3.axisBottom(x);

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, Number(d3.max(stackedData[stackedData.length - 1], function(d) { return d['y0'] + d['y']; })
      )]).nice();

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // g.append('g')
    //   .attr('class', 'axis axis--x')
    //   .attr('transform', 'translate(0,' + contentHeight + ')')
    //   .call(d3.axisBottom(x));

    // g.append('g')
    //   .attr('class', 'axis axis--y')
    //   .call(d3.axisLeft(y).ticks(10, '%'))
    //   .append('text')
    //   .attr('transform', 'rotate(-90)')
    //   .attr('y', 6)
    //   .attr('dy', '0.71em')
    //   .attr('text-anchor', 'end')
    //   .text('Frequency');




    let layer = g.selectAll('.stack')
      .data(data)
      .enter().append('g')
      .attr('class', 'stack')
      .style("fill", function (d, i) {
        return color[i];
    });
    layer.selectAll("rect")
    .data(function (d) {
        return d;
    })
    .enter().append("rect")
    .attr("x", function (d) {
        return x(d['x']);
    })
    .attr("y", function (d) {
        return y(d['y'] + d['y0']);
    })
    .attr("height", function (d) {
        return y(d['y0']) - y(d['y'] + d['y0']);
    })
    .attr("width", x['rangeBand']());
  }
}
