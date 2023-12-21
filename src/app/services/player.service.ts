import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerUrl: string = "http://localhost:3000/players";
  constructor(private httpClient: HttpClient) { }
  addPlayer(obj: any) {
    return this.httpClient.post<{msg:any}>(this.playerUrl, obj)
  }
  getAllPlayers() {
    return this.httpClient.get<{T:any}>(this.playerUrl)
  }
  getPlayerById(id: number) {
    return this.httpClient.get<{playerFound:any}>(`${this.playerUrl}/${id}`)
  }
  updatePlayer(obj: any) {
    return this.httpClient.put<{msg:any}>(this.playerUrl, obj)
  }
  deletePlayer(id: number) {
    return this.httpClient.delete<{msg:any}>(`${this.playerUrl}/${id}`)
  }
}
