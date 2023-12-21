import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})
export class AddStadiumComponent implements OnInit {
  stadiumForm: FormGroup;
  stadiumsTab: any;
  stadium: any;
  banner: string = "Add stadium";

  constructor(private builder: FormBuilder, private route:Router) { }
  ngOnInit() {
    this.stadiumForm = this.builder.group({
      stadiumName: ['', [Validators.required, Validators.minLength(3)]],
      city: [''],
      capacity: ['']
    })
  }
  addStadium() {
    this.stadiumsTab = JSON.parse(localStorage.getItem("stadiums") || "[]");
    this.stadium = this.stadiumForm.value;
    // console.log("here is stadium obj", this.stadiumForm.value);
    this.stadium.id = this.generatedId(this.stadiumsTab) + 1;
    this.stadiumsTab.push(this.stadium);
    localStorage.setItem("stadiums", JSON.stringify(this.stadiumsTab));
  }
  generatedId(T:any) {
    let max:any;
    if (T.length == 0) {
      max = 0;
    } else {
      max = T[0].id;
      for (let i = 0; i < T.length; i++) {
        if (T[i].id > max) {
          max = T[i].id;

        }
      }
    }
    return max;
  }
}
