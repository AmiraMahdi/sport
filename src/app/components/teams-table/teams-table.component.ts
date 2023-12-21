import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allTeams } from 'src/app/data/teamsData';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
  obj:any={};
  search:any=[];
  teams: any=[];
  path: any;
  isDisplayed: boolean = false;
  constructor(private router: Router,
    private teamService:TeamService) { }

  ngOnInit() {
    this.allTeams();
    
    this.path = this.router.url
    if (this.path == "/admin") {
      this.isDisplayed = true;
    }

  }

  allTeams() {
    this.teamService.getAllTeams().subscribe(
      (data) => {
        this.teams = data.T;
      }
    );
  }

  searchByStadium(){
    this.teams = allTeams;
    this.search=[];
    for (let i = 0; i < this.teams.length; i++) {
      if (this.obj.search==this.teams[i].stadium) {
        this.search.push(this.teams[i]);
      }
      
    }
    this.teams=this.search;
  }

  goToDisplayTeam(id:number){
    this.router.navigate([`teamInfo/${id}`])
  }
  goToEditTeam(id:number){
    this.router.navigate([`editTeam/${id}`])
  }
  goToDeleteTeam(id:number){
    this.teamService.deleteTeam(id).subscribe(
      (data) => {
        this.allTeams();
  }
    )

}}
