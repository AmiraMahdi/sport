import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-match',
  templateUrl: './search-match.component.html',
  styleUrls: ['./search-match.component.css']
})
export class SearchMatchComponent implements OnInit {
  banner: string = "Search Match by team";
  searchForm: FormGroup;
  obj: any = {};


  constructor(private router: Router) { }

  ngOnInit() {
  }
  searchByTeam() {

    localStorage.setItem("search", JSON.stringify(this.obj));
    this.router.navigate(["allMatches/search"]);
  }
}
