import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  banner: string = "Profile";
  userId: any;
  user: any;
  constructor(private usersService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');

    this.usersService.getUserById(this.userId).subscribe((data) => {
      this.user = data.userFound;
    })
  }

}
