import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  banner: string = "Player Info";
  playerId: any;
  // players: any = allPlayers;
  foundPlayer: any;
  constructor(private activatedRoute: ActivatedRoute,
    private playerService:PlayerService) { }

  ngOnInit() {
    this.playerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.playerService.getPlayerById(this.playerId).subscribe(
      (data)=>{
        this.foundPlayer = data.playerFound;
      }
    );

    // this.foundPlayer = this.players.find(
    //   (obj: any) => { return obj.id == this.playerId }
    // );
    // console.log('here is foundPlayer', this.foundPlayer);
  }


}