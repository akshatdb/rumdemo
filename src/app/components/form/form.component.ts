import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  constructor() { }
  countryList = [
    {id: 1, name: 'India'},
  ]
  stateList = [
    {id: 1, name: 'UP'},
    {id: 2, name: 'Maharashtra'},
    {id: 3, name: 'Karnataka'}
  ]
  cityList = [
    {id: 1, name: 'Lucknow'},
    {id: 2, name: 'Mumbai'}
  ]
  formfields = [
    {type: 'input', name: 'firstname', label: 'First Name', width: '3', validations: [Validators.required]},
    {type: 'input', name: 'lastname', label: 'First Name', width: '3', validations: [Validators.required]},
    {type: 'input', name: 'mobile', label: 'Mobile Number', width: '3', validations: [Validators.required, Validators.pattern('[0-9]*')]},
    {type: 'radiogroup', name: 'gender', label: 'Gender', width: '3', list: [{id: 1, name:'Male'},{id: 2, name: 'Female'}], namefield: 'name', valfield: 'id', validations: [Validators.pattern(/[0-9]*/)]},
    {type: 'dropdown', name: 'country', label: 'Country', width: '4', validations: [Validators.required], namefield: 'name', valfield: 'id', list: this.countryList},
    {type: 'dropdown', name: 'state', label: 'State', width: '4', validations: [Validators.required], namefield: 'name', valfield: 'id', list: this.stateList},
    {type: 'dropdown', name: 'city', label: 'City', width: '4', validations: [Validators.required], list: this.cityList, namefield: 'name', valfield: 'id'},
    {type: 'textarea', name: 'address', label: 'Address', width: '6', validations: [Validators.required]},
    {type: 'datepicker', name: 'startdate', label: 'Start Date', width: '3', validations: [Validators.required]},
    {type: 'datepicker', name: 'enddate', label: 'End Date', width: '3', validations: [Validators.required]}
  ];
  form:FormGroup;


  ngOnInit() {
    let formObj = {};
    for(let obj of this.formfields){
      formObj[obj.name] = new FormControl(null,obj.validations)
    }
    this.form = new FormGroup(formObj);

  }

  onSave(val){
    console.log(val);
  }

  //to verify form before submit
  disableState;
  verifyform(){
    if(this.form.valid)
      this.disableState = false;
    else{
      this.disableState = true;
      this.form.markAllAsTouched();
    }
  }
}
