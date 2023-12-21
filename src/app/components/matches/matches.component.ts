import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: any = [];
  searchedMatches: any = [];
  banner: string = "Matches";
  team: string;
  path: any;
  constructor(private router: Router, private matchService: MatchService) { }

  ngOnInit() {
    // this.matches = allMatches;
    // appel de la methode du service !! subscribe ne fonctionne pas sans return dans la methode
    this.matchService.getAllMatches().subscribe((data) => {
      this.matches = data.T;
    });



    this.team = (JSON.parse(localStorage.getItem("search")) || "[]")
    for (let i = 0; i < this.matches.length; i++) {
      if (this.matches[i].teamOne == this.team.search || this.matches[i].teamTwo == this.team.search) {
        this.searchedMatches.push(this.matches[i]);
      }
    }
    this.path = this.router.url;
    if (this.path == "/allMatches/search") {
      this.matches = this.searchedMatches;
    }
  }

}
