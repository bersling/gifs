import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  constructor() { }


  selectedValue: string;
  
    foods = [
      {value: 'steak-0', viewValue: 'vom Funktionsgraph'},
      {value: 'pizza-1', viewValue: 'von der x-Achse'},
      {value: 'tacos-2', viewValue: 'von der y-Achse'}
    ];
  

  ngOnInit() {
  }

}
