import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { allTeams } from 'src/app/data/teamsData';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  banner: string="Teams";
  searchStadiumForm: FormGroup
  
  teams:any;
  constructor() { }

  ngOnInit() {
    this.teams=allTeams;
  }
  
}
