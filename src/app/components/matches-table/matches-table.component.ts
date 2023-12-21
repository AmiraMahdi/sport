import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
  matches: any=[];
  constructor(private router: Router,
    private matchService: MatchService) { }

  ngOnInit() {
    // this.matches = allMatches;
    this.matchService.getAllMatches().subscribe(
      (data) => {
        // console.log("here message",data.a)
        console.log("here matches", data);
        console.log("here is matchesTab", data.T);
        this.matches=data.T;
        }
    );

  }
  goToDisplay(id: number) {
    this.router.navigate([`matchInfo/${id}`])
  }
  goToEdit(id: number) {
    this.router.navigate([`editMatch/${id}`])
  }
  deleteMatch(id: number) {
    this.matchService.deleteMatches(id).subscribe(
      (data)=>{
        console.log("here is delete response",data.msg)
        this.matches;
      }
    )
  }

}
