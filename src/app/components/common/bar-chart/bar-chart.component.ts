import { Component, OnInit, ViewEncapsulation, ViewChild, OnChanges, ElementRef, Input, HostBinding } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges {

  constructor() { }

  @ViewChild('chart', {static: false})
  private chartContainer:  ElementRef;

  @Input()
  model: any;

  margin = {top: 20, right: 20, bottom: 30, left: 40};
  labelKey;
  valueKey;
  data = [];

  ngOnChanges() {
    if (!this.model) { return; }
    this.labelKey = this.model.label;
    this.valueKey = this.model.value;
    this.data = this.model.data;
    if(this.chartContainer)
      this.createChart();
  }
  ngAfterViewInit(){
    if(this.chartContainer && this.model)
      this.createChart();
  }
  
  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = this.data;

    const svg = d3.select(element).append('svg')
        .attr('width', element.offsetWidth)
        .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d[this.labelKey]));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, Number(d3.max(data, (d:any) => d[this.valueKey]))]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d:any) => x(d[this.labelKey]))
        .attr('y', (d:any) => y(d[this.valueKey]))
        .attr('width', x.bandwidth())
        .attr('height', (d:any) => contentHeight - y(d[this.valueKey]));
  }

}
