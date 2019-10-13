import { Injectable } from "@angular/core";
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, publish, refCount, map } from "rxjs/operators";
import { Observable, EMPTY,  throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SpotifyApiService {
  public userPlayList: string;
  private token: string;
  private baseUrl = "https://api.spotify.com/v1";

  constructor(private http: HttpClient) { }

  private getToken(): string {
    this.token = this.token ? this.token : sessionStorage.getItem("spotify-token");
    return this.token;
  }

  private handleError(error) {
    return throwError(error);
  }

  getUserPlayLists(): Observable<{}> {
      return this.http.get(`${this.baseUrl}/me/playlists`, {
        headers: {"Authorization": `Bearer ${this.getToken()}`}
      })
      .pipe(
        catchError(this.handleError)
       );
  }

  getPlayListsById(userId): Observable<{}> {
    return this.http.get(`${this.baseUrl}/users/${userId}/playlists`, {
      headers: {"Authorization": `Bearer ${this.getToken()}`}
    })
    .pipe(
      catchError(this.handleError)
     );
  }

  getUserProfile(): Observable<{}> {
      return this.http.get(`${this.baseUrl}/me`, {
        headers: {"Authorization": `Bearer ${this.getToken()}`}
      })
      .pipe(
        catchError(this.handleError)
       );
  }

  getTracks(playListId): Observable<{}> {
      return this.http.get(`${this.baseUrl}/playlists/${playListId}`, {
        headers: {"Authorization": `Bearer ${this.getToken()}`}
      })
      .pipe(
        catchError(this.handleError)
       );
  }

  getTrackById(id): Observable<{}> {
    return this.http.get(`${this.baseUrl}/tracks/${id}`, {
      headers: {"Authorization": `Bearer ${this.getToken()}`}
    })
    .pipe(
      catchError(this.handleError)
     );
  }

}
