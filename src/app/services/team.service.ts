import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamUrl: string = "http://localhost:3000/teams";
  constructor(private httpClient: HttpClient) { }
  addTeam(obj: any) {
    return this.httpClient.post<{msg:any}>(this.teamUrl, obj)
  }
  getAllTeams() {
    return this.httpClient.get<{T:any}>(this.teamUrl)
  }
  getTeamById(id: number) {
    return this.httpClient.get<{teamFound:any}>(`${this.teamUrl}/${id}`)
  }
  updateTeam(obj: any) {
    return this.httpClient.put<{msg:any}>(this.teamUrl, obj)
  }
  deleteTeam(id: number) {
    return this.httpClient.delete<{msg:any}>(`${this.teamUrl}/${id}`)
  }


}
