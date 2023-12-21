import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allTeams } from 'src/app/data/teamsData';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {
  banner: string = "Team Info";
  teamId: any;
  foundTeam: any ={};
  teams: any = allTeams;

  constructor(private activateRoute: ActivatedRoute, 
    private teamService:TeamService) { }
  
  ngOnInit() {
    this.teamId = this.activateRoute.snapshot.paramMap.get('id');
    this.teamService.getTeamById(this.teamId).subscribe(
      (data) => { this.foundTeam=data.teamFound }
    )
    
  

  }

}
