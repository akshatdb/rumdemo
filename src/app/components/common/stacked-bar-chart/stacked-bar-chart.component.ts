import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { Subject, merge, combineLatest } from 'rxjs';
import { mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements OnInit {

  constructor(private container: ElementRef) { }
  @ViewChild('chart', { static: false })
  private chartContainer: ElementRef;

  @Input()
  model: any;

  @Output()
  hover: EventEmitter<any> = new EventEmitter();
  @Output()
  click: EventEmitter<any> = new EventEmitter();

  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  labelKey;
  valueKey;
  stackOrder = [];
  data = [];
  rectangleEvent: Subject<any> = new Subject();
  stackEvent: Subject<any> = new Subject();
  toolTip = (d, i) => {
    return `WIP tooltip`;
  }

  ngOnInit() {

  }
  ngOnChanges() {
    if (!this.model) { return; }
    this.labelKey = this.model.label;
    this.valueKey = this.model.value;
    this.stackOrder = this.model.stackOrder;
    this.data = this.model.data;
    this.toolTip = this.model.toolTip?this.model.toolTip:this.toolTip;
    if (this.container)
      this.createChart();
  }
  ngAfterViewInit() {
    if (this.container)
      this.createChart();
  }

  private createChart(): void {

    const element = this.container.nativeElement.children[0];
    d3.select(element).select('svg').remove();
    const data = this.data;
    var margin = { top: 20, right: 50, bottom: 30, left: 50 };


    const dataIntermediate = this.stackOrder.map((stackKey) => {
      return data.map((row) => {
        return { x: row[this.labelKey], y: row[stackKey] };
      });
    })
    let sumList;
    const stackedData = dataIntermediate.map(row => {
      if (!sumList)
        sumList = row.map(row => 0);
      let i = 0;
      let newObj = row.map(innerRow => {
        let obj = {
          x: innerRow.x,
          y0: sumList[i],
          y: innerRow.y
        }
        i++;
        return obj;
      });
      for (let i = 0; i < row.length; i++) {
        sumList[i] = sumList[i] + row[i]['y'];
      }
      return newObj;
    })
    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    let x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.35);

    let y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0]);

    let color = d3.scaleOrdinal(d3.schemeCategory10);

    let xAxis = d3.axisBottom(x);
    const svg = d3.select(element).append('svg')
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight).append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(stackedData[0].map((d) => {
      return d.x;
    }));
    y.domain([0,
      d3.max(stackedData[stackedData.length - 1],
        (d) => { return d.y0 + d.y; })
    ]).nice();

    let layer = svg.selectAll(".stack")
      .data(stackedData)
      .enter().append("g")
      .attr("class", "stack")
      .style("fill", (d, i) => {
        return color(String(i));
      });
    layer.selectAll("rect")
      .data((d) => {
        return d;
      })
      .enter().append("rect")
      .attr("x", (d) => {
        return x(d.x);
      })
      .attr("y", (d) => {
        return y(d.y + d.y0);
      })
      .attr("height", (d) => {
        return y(d.y0) - y(d.y + d.y0);
      })
      .attr("width", x.bandwidth());

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + contentHeight + ")")
      .call(xAxis);

    let that = this;
    svg.selectAll('.stack')
      .on('mouseenter', (d, i) => {
        that.rectangleEvent.next({val: d, index: i, event: d3.event, hover: 'start'});
      })
      .on('mousemove', (d, i) => {
        d3.select('#tooltip')
        .style('left', d3.event.pageX-10+'px')
        .style('top', d3.event.pageY-10+ 'px')
        .select('#value')
        .text(that.toolTip(d[i], i));
        d3.select("#tooltip").classed("hidden", false);
      })
      .on('mouseout', (d, i) => {
        d3.select("#tooltip").classed("hidden", true);
        that.rectangleEvent.next({val: d, index: i, event: d3.event, hover: 'end'});
      })
      .on('click', (d, i) => {
        that.rectangleEvent.next({val: d, index: i, event: d3.event})
      });

      svg.selectAll('rect')
      .on('mouseenter', (d, i) => {
        that.stackEvent.next({val: d, index: i, event: d3.event, hover: 'start'});
      })
      .on('mouseout', (d, i) => {
        that.stackEvent.next({val: d, index: i, event: d3.event, hover: 'end'});
      })
      .on('click', (d, i) => {
        that.stackEvent.next({val: d, index: i, event: d3.event});
      })


      combineLatest(that.stackEvent, that.rectangleEvent).subscribe(res => {
        console.log(res);
      })
  }
}
