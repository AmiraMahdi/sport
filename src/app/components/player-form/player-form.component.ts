import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allPlayers } from 'src/app/data/playersData';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  playerForm: FormGroup;
  banner: string = "Add Player";
  obj: any = {};
  playerId: any;
  teams: any = [];
  teamId: any;
  // players:any= allPlayers;
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private teamService: TeamService,
  ) {
  }
  ngOnInit() {
    this.teamService.getAllTeams().subscribe((data) => {
      this.teams = data.T;
    });
    this.playerService.getAllPlayers().subscribe();
    this.playerForm = this.formBuilder.group({
      playerName: ['', [Validators.required, Validators.minLength(3)]],
      age: [''],
      number: [''],
      position: ['']
    })
    this.playerId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.playerId) {
      this.banner = "Edit Player"
      this.playerService.getPlayerById(this.playerId).subscribe(
        (data) => {
          this.obj = data.playerFound;
        }

      );
      // this.obj = this.players.find(
      //   (obj: any) => { return obj.id == this.playerId }
      // )
    }
  }
  addEditPlayer() {
    if (this.playerId) {
      
      this.playerService.updatePlayer(this.obj).subscribe(
        (data) => {
          console.log("here data", data);
          this.router.navigate(['admin']);
        }
      );
    } else {
      this.obj.tId = this.teamId;
      console.log("Here is final obj",this.obj);
      this.playerService.addPlayer(this.obj).subscribe(
        (data) => {
          console.log("here data", data)
        }
      );
    }
    // console.log("here is player obj", this.playerForm.value);
  }
  selectTeam(evt: any) {
    console.log("Here is evt", evt.target.value);
    this.teamId = evt.target.value;
  }
}
