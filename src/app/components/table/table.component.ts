import { Component, OnInit, HostListener } from '@angular/core';
import { DataTableModel } from '../common/data-table/data-table.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoggerService } from 'src/app/services/logger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private logger: LoggerService, private router: Router) { }
  tableModel: DataTableModel;
  data = [
    { fieldname: 'Button', noofclicks: 4, route: '/form' },
    { fieldname: 'Link', noofclicks: 1, route: '/form' },
    { fieldname: 'Row', noofclicks: 2, route: '/form' },
    { fieldname: 'Icon', noofclicks: 5, route: '/form' }
  ];
  countryList = [
    { id: 1, name: 'India' },
  ]
  stateList = [
    { id: 1, name: 'UP' },
    { id: 2, name: 'Maharashtra' },
    { id: 3, name: 'Karnataka' }
  ]
  cityList = [
    { id: 1, name: 'Lucknow' },
    { id: 2, name: 'Mumbai' }
  ]
  formfields = [
    { type: 'input', name: 'firstname', label: 'First Name', width: '3', validations: [Validators.required] },
    { type: 'input', name: 'lastname', label: 'First Name', width: '3', validations: [Validators.required] },
    { type: 'input', name: 'mobile', label: 'Mobile Number', width: '3', validations: [Validators.required, Validators.pattern('[0-9]*')] },
    { type: 'radiogroup', name: 'gender', label: 'Gender', width: '3', list: [{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }], namefield: 'name', valfield: 'id', validations: [Validators.pattern(/[0-9]*/)] },
    { type: 'dropdown', name: 'country', label: 'Country', width: '4', validations: [Validators.required], namefield: 'name', valfield: 'id', list: this.countryList },
    { type: 'dropdown', name: 'state', label: 'State', width: '4', validations: [Validators.required], namefield: 'name', valfield: 'id', list: this.stateList },
    { type: 'dropdown', name: 'city', label: 'City', width: '4', validations: [Validators.required], list: this.cityList, namefield: 'name', valfield: 'id' },
    { type: 'textarea', name: 'address', label: 'Address', width: '6', validations: [Validators.required] },
    { type: 'datepicker', name: 'startdate', label: 'Start Date', width: '3', validations: [Validators.required] },
    { type: 'datepicker', name: 'enddate', label: 'End Date', width: '3', validations: [Validators.required] }
  ];
  form: FormGroup;
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
    let formObj = {};
    for (let obj of this.formfields) {
      formObj[obj.name] = new FormControl(null, obj.validations)
    }
    this.form = new FormGroup(formObj);
  }


  //GLOBAL LISTENER CODE STARTS HERE
  // @HostListener('click', ['$event'])
  // onclick(evt) {
  //   if (this.applyFilter(evt.target)) {
  //     let label = this.getLabel(evt.target);
  //     this.logger.logClick({ label: label, type: evt.target.tagName });
  //   }
  // }
  // getLabel(evt) {
  //   // console.log(evt);
  //   return 'boolean';
  // }
  // includeList = ['mat-button', 'mat-input'];
  // applyFilter(element) {
  //   if (this.checkClassList(element.className, this.includeList))
  //     return true;
  //   return false;
  // }
  // private checkClassList(classList, includeList) {
  //   let flag = false;
  //   includeList.forEach(className => {
  //     if (classList.indexOf(className) !== -1)
  //       flag = true;
  //   });
  //   return flag;
  // }
  // timer;
  // @HostListener('mouseenter', ['$event'])
  // mouseenter(evt) {
  //   this.timer = Date.now();
  // }
  // timeOutConst = 1;
  // @HostListener('mouseleave', ['$event'])
  // mouseleave(evt) {
  //   let label = this.getLabel(evt.target);
  //   if (((Date.now() - this.timer) / 1000) > this.timeOutConst)
  //     this.logger.logHover({ route: this.router.url, hoverTime: ((Date.now() - this.timer) / 1000), label: label, type: evt.target.tagName });
  // }
  //GLOBAL LISTENER CODE ENDS HERE
}
