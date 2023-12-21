import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {
  match: FormGroup;
  obj: any = {};
  matchId: any;
  banner: string = "Add Match";
  // matches: any = allMatches;

  constructor(private activatedRoute: ActivatedRoute,
    private matchService: MatchService,
    private router: Router) { }

  ngOnInit() {
    this.matchService.getAllMatches().subscribe();
    this.matchId = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (this.matchId) {
      this.banner = "Edit Match";
      this.matchService.getMatchById(this.matchId).subscribe((data) => {
        console.log("here match", data.matchFound);
        this.obj = data.matchFound;
      }
      );
      // this.obj = this.matches.find(
      //   (obj: any) => { return obj.id == this.matchId }
      // )
    }

  }

  addOrEditMatch() {
    if (this.matchId) {
      this.matchService.updateMatch(this.obj).subscribe(
        (data) => {
          console.log("here data", data);
          this.router.navigate(['admin']);

        }
      );
    }
    else {
      this.matchService.addMatch(this.obj).subscribe(
        (data) => {
          console.log("here data", data)
        }
      );

    }
    // console.log("here is match Obj", this.obj);
  }

}
