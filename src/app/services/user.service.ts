import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = "http://localhost:3000/users";
  constructor(
    private httpclient: HttpClient
  ) { }

  addUser(obj: any, img: File) {
    let fData = new FormData();
    fData.append("firstName", obj.firstName);
    fData.append("lastName", obj.lastName);
    fData.append("email", obj.email);
    fData.append("tel", obj.tel);
    fData.append("password", obj.password);
    fData.append("role", obj.role);
    fData.append("img", img);
    return this.httpclient.post<{ msg: any }>(`${this.userUrl}/signup`, fData);
  }

  login(obj: any) {
    return this.httpclient.post<{ msg: any, token:any}>(`${this.userUrl}/login`, obj);
  }
  
  getUserById(id: number) {
    return this.httpclient.get<{ userFound: any }>(this.userUrl + '/' + id);
  }
}
