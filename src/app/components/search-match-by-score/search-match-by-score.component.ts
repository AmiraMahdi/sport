import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-search-match-by-score',
  templateUrl: './search-match-by-score.component.html',
  styleUrls: ['./search-match-by-score.component.css']
})
export class SearchMatchByScoreComponent implements OnInit {
  banner: string = "Search Match by score";
  searchByScoreForm: FormGroup;
  obj: any = {};
  matches:any=[];
  erreur:string="";


  constructor(
    private matchService: MatchService) { }

  ngOnInit() {
  }
  searchByScore() {
    this.matchService.searchMatchByScore(this.obj).subscribe(
      (data)=>{ if (data.msg) {
        this.matches=data.matches;
      } else {
        this.matches=[];
        this.erreur="match not found"
      }

      })
  }
}

