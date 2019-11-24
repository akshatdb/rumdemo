import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  opennav:EventEmitter<boolean> = new EventEmitter();
  menuOpen = false;
  constructor() { }

  ngOnInit() {
  }
  openNav(){
    this.menuOpen = !this.menuOpen;
    this.opennav.emit(this.menuOpen);
  }

}
