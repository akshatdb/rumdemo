import { Component, OnInit } from '@angular/core';
import { DataTableModel } from '../common/data-table/data-table.model';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private logger: LoggerService) { }
  data = [
    { fieldname: 'Button', noofclicks: 4, route: '/form' },
    { fieldname: 'Link', noofclicks: 1, route: '/form' },
    { fieldname: 'Row', noofclicks: 2, route: '/form' },
    { fieldname: 'Icon', noofclicks: 5, route: '/form' }
  ];
  deviceData = [

  ]
  tableModel: DataTableModel;
  deviceDataModel: DataTableModel;
  ngOnInit() {
    this.tableModel = new DataTableModel({
      dataSource: this.data,
      columns: ['fieldname', 'noofclicks', 'route'],
      columnDefs: [
        { name: 'fieldname', header: 'Field' },
        { name: 'noofclicks', header: 'No of clicks' },
        { name: 'route', header: 'Route' }
      ]
    });
    let info = this.logger.getInfo();
    this.deviceData = [
      { name: 'Operating System', value: info['operatingSystem'] },
      { name: 'DeviceType', value: info['device'] },
      { name: 'Resolution', value: info['resolution'] }
    ]
    this.deviceDataModel = new DataTableModel({
      dataSource: this.deviceData,
      columns: ['name', 'value'],
      columnDefs: [
        { name: 'name', header: 'Property' },
        { name: 'value', header: 'Value' }
      ]
    })
  }

}
