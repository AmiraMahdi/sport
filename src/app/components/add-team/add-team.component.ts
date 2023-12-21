import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  banner: string = "Add team";
  addTeamForm = FormGroup;
  obj:any={};
  stadiums: any;
  teamsTab:any;
  teamId:any;
  imagePreview:string;

  

  constructor(private activatedRoute: ActivatedRoute,
    private teamService:TeamService,
    private router: Router) { }

  ngOnInit() {
    this.stadiums = JSON.parse(localStorage.getItem("stadiums")|| "[]");
    this.teamService.getAllTeams().subscribe();
    this.teamId = this.activatedRoute.snapshot.paramMap.get('id');
    

  }
  
  addTeam(){
    this.teamService.addTeam(this.obj).subscribe(
      (data) => {
        console.log("here data", data)
      }
    );

  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  // generatedId(T:any) {
  //   let max:any;
  //   if (T.length == 0) {
  //     max = 0;
  //   } else {
  //     max = T[0].id;
  //     for (let i = 0; i < T.length; i++) {
  //       if (T[i].id > max) {
  //         max = T[i].id;

  //       }
  //     }
  //   }
  //   return max;
  // }
}

