import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() x: any;
  constructor() { }

  ngOnInit() {
  }
  scoreResult(a: number, b: number) {
    if (a > b) {
      return 2
    }
    else if (a < b) {
      return 1
    }
    else {
      return 0
    }
  }
  teamResult(a: number, b: number) {
    if (a > b) {
      return 'darkred'
    }
    else if (a < b) {
      return 'blue'
    }
    else {
      return 'yellow'
    }
  }


}
