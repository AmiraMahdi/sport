import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  banner: string = "Signup";
  path: string = "";
  imagePreview: any;
  constructor(private X: FormBuilder,
    private router: Router,
    private userService: UserService) { }
  ngOnInit() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/;
    this.signupForm = this.X.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      tel: [''],
      img: [''],

    })

  }
  signup() {

    console.log("signup clicked", this.signupForm.value);

    this.path = this.router.url;
    // if (this.path == "/signupAdmin") {
    //   this.signupForm.value.role = "admin"
    // } else {
    //   this.signupForm.value.role = "user"
    // }
    this.signupForm.value.role = (this.path == "/signupAdmin") ? "admin" : "user";
    // ? if true
    // : if not
    this.userService.addUser(this.signupForm.value, this.signupForm.value.img).subscribe(
      (data) => {
        console.log("Here is signup obj", data);
      });

  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
}
