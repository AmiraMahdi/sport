import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  obj: any = {};
  banner: string = "Login";
  erreur: string = "";

  constructor(private userService: UserService,
    private router: Router) { }
  ngOnInit() {
  }

  login() {
    this.userService.login(this.obj).subscribe(
      (data) => {
        if (data.token) {
          sessionStorage.setItem("jwt", data.token);
          let user: any = this.decodeToken(data.token)
          if (user.role == "admin") {
            this.router.navigate([`admin`]);
          } else {
            this.router.navigate([`profile/${user.id}`]);
          }
        } else {
          this.erreur = "Please check your email/pwd"
        }


      });
    //  console.log("here is user obj", this.obj);
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
