import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allPlayers } from 'src/app/data/playersData';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
  players: any = [];

  constructor(private router: Router,
    private playerService: PlayerService) { }

  ngOnInit() {
    // this.players = allPlayers;
    this.allPlayers();
  }
  allPlayers() {
    this.playerService.getAllPlayers().subscribe(
      (data) => {
        this.players = data.T;
      }
    );
  }
  goToDisplayPlayer(id: number) {
    this.router.navigate([`playerInfo/${id}`])
  }
  goToEditPlayer(id: number) {
    this.router.navigate([`editPlayer/${id}`])
  }
  deletePlayer(id: number) {
    this.playerService.deletePlayer(id).subscribe(
      (data) => {
        // on peut faire l'appel d'une methode du service dans une autre methode
        this.allPlayers();
        // this.playerService.getAllPlayers().subscribe(
        //   (data) => {
        //     this.players = data.players;
        //   }
        // )
      }
    );
  }
}
