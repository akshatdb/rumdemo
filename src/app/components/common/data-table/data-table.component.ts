import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DataTableModel } from './data-table.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {

  constructor() { }
  @Input()
  tableModel:DataTableModel;
  data = [
    {fieldname: 'Button', noofclicks: 4, route: '/form'},
    {fieldname: 'Link', noofclicks: 1, route: '/form'},
    {fieldname: 'Row', noofclicks: 2, route: '/form'},
    {fieldname: 'Icon', noofclicks: 5, route: '/form'}
  ]
  ngOnInit() {
  }

}
