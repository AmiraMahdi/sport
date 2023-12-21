import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allTeams } from 'src/app/data/teamsData';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  banner: string = "Edit Team";
  editForm: FormGroup;
  teamId: any = {};
  match: any = {};
  team: any = [];
  foundTeam: any;
  teams = allTeams;
  constructor(private activatedRoute: ActivatedRoute,
    private teamService:TeamService,
    private router:Router) { }

  ngOnInit() {
    this.teamId = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.teamId) {
      this.teamService.getTeamById(this.teamId).subscribe((data) => {
        console.log("here team", data.teamFound);
        this.team = data.teamFound;
      }
      );
    }
  }
  // editTeam() {
  //   if (this.teamId) {
  //     this.teamService.updateTeam(this.team).subscribe(
  //       (data) => {
  //         console.log("here data", data);
  //         this.router.navigate(['admin']);

  //       }
  //     );
  //   }
    
  // }





}
