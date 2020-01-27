import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor() { }
  data = [
    {
      "letter": "A",
      "frequency": 0.08167
    },
    {
      "letter": "B",
      "frequency": 0.01492
    },
    {
      "letter": "C",
      "frequency": 0.02782
    },
    {
      "letter": "D",
      "frequency": 0.04253
    },
    {
      "letter": "E",
      "frequency": 0.12702
    },
    {
      "letter": "F",
      "frequency": 0.02288
    },
    {
      "letter": "G",
      "frequency": 0.02015
    },
    {
      "letter": "H",
      "frequency": 0.06094
    }
  ]
  model1;
  model2;
  ngOnInit() {
    this.model1 = {
      data: this.data,
      label: 'letter',
      value: 'frequency',
    };

    this.model2 = {
      data: [
        {month: 'Jan', A: 20, B: 5, C: 10},
        {month: 'Feb', A: 25, B: 10, C: 20}
      ],
      stackOrder: ['A', 'B', 'C'],
      label: 'month',
      value: 'frequency',
    }
  }

  click(evt){
    console.log(evt);
  }

}
