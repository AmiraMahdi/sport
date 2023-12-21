import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  // matchUrl: string = "http://localhost:3000/allMatches";
  matchUrl: string = "http://localhost:3000/matches";
  constructor(private httpClient: HttpClient) { }

  addMatch(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.matchUrl, obj);
  }
  getAllMatches() {
    return this.httpClient.get<{ T: any }>(this.matchUrl);
  }
  getMatchById(id: number) {
    return this.httpClient.get<{ matchFound: any }>(this.matchUrl + '/' + id);
  }
  updateMatch(obj: any) {
    return this.httpClient.put<{ msg: string }>(this.matchUrl, obj);
  }
  deleteMatches(id: number) {
    return this.httpClient.delete<{ msg: string }>(`${this.matchUrl}/${id}`);
  }
  searchMatch(obj: any) {
    return this.httpClient.post(`${this.matchUrl}/search`, obj);
  }
  searchMatchByScore(obj: any) {
    return this.httpClient.post<{ matches: any, msg: string }>(`${this.matchUrl}/searchScore`, obj);
  }

}
