import { Component, OnInit } from '@angular/core';
import { DataTableModel } from '../common/data-table/data-table.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  data = [
    {fieldname: 'Button', noofclicks: 4, route: '/form'},
    {fieldname: 'Link', noofclicks: 1, route: '/form'},
    {fieldname: 'Row', noofclicks: 2, route: '/form'},
    {fieldname: 'Icon', noofclicks: 5, route: '/form'}
  ];
  tableModel:DataTableModel;  
  ngOnInit() {
    this.tableModel = new DataTableModel({
      dataSource: this.data,
      columns: ['fieldname', 'noofclicks','route'],
      columnDefs: [
        {name: 'fieldname', header:'Field'},
        {name: 'noofclicks', header:'No of clicks'},
        {name: 'route', header: 'Route'}
      ]
    });
  }

}
