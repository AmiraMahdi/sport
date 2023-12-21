import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  banner: string = "Match-info";
  matchId: any;
  // matches: any = allMatches;
  foundMatch: any;
  constructor(private activatedRoute: ActivatedRoute,
    private matchService: MatchService) { }

  ngOnInit() {
    this.matchId = this.activatedRoute.snapshot.paramMap.get('id');
    // for (let i = 0; i < this.matches.length; i++) {
    //   if (this.matchId == this.matches[i].id) {
    //     this.foundMatch = this.matches[i];
    //     break;
    //   }
    // }
    this.matchService.getMatchById(this.matchId).subscribe(
      (data) => {
        console.log("here match", data.matchFound);
        this.foundMatch = data.matchFound;
      }
    );
    // this.foundMatch=this.matches.find(
    //   (obj:any)=>{return obj.id == this.matchId}
    // );
    // console.log('here is foundMatch', this.foundMatch);
  }


}
