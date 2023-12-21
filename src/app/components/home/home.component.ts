import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  matches: any;
  match:any;
  players: any;
  lastPlayers: any=[];
  constructor(private matchesService: MatchService,
    private playersService: PlayerService) { }

  ngOnInit() {
    this.matchesService.getAllMatches().subscribe((data) => {
      this.matches = data.T;
      this.match=this.matches[this.matches.length-1]

    })
    this.playersService.getAllPlayers().subscribe((data) => {
      this.players = data.T;
      for (let i = 0; i < 3; i++) {
        this.lastPlayers[i]=this.players[(this.players.length-1)-i];
        
      }
    })

  }

}
