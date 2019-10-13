//
// TODO: to be replaced by backend side authentication
//
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, bindNodeCallback, of } from "rxjs";
import { Router } from "@angular/router";
import secrets from "../../Secrets";
import { HttpParams, HttpClient } from "@angular/common/http";

abstract class SpotifyApi {
  private constructor() { }

  static readonly authEndpoint = "https://accounts.spotify.com/authorize";
  static readonly clientId = secrets.spotifyClientId;
  static readonly redirectUri = "http://localhost:4300/callback/";
  static readonly scopes = [
    // "user-read-currently-playing",
    // "user-read-playback-state",
    "user-read-private",
    "user-read-email",
    // "playlist-modify-public",
    // "playlist-modify-private"
  ];
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _spotifyToken = "spotify-token";
  private _token: string;
  public loginUrl = "./login";
  public homeUrl = "./home";

  constructor(private router: Router) { }

  handleCallback() {
    if (window.location.hash) {
      const hash = window.location.hash;
      if (window.location.search.substring(1).indexOf("error") !== -1) {
        // login failure
        console.error("Not authenticated!!");
        this.router.navigate([this.loginUrl]);
      } else if (hash) {
        // login success
        const token = window.location.hash.split("&")[0].split("=")[1];
        window.location.hash = "";
        sessionStorage.setItem(this._spotifyToken, token);
        this.router.navigate([this.homeUrl]);
      }
    } {
      this.router.navigate([this.homeUrl]);
    }
  }

  get token(): string {
    if (!this._token) {
      this._token = sessionStorage.getItem(this._spotifyToken);
    }
    return this._token;
  }
  get authenticated(): boolean {
    return !!this.token;
  }

  login() {
    let params: HttpParams = new HttpParams();
    params = params.set("client_id", SpotifyApi.clientId)
              .set("redirect_uri", SpotifyApi.redirectUri)
              .set("scope", `${SpotifyApi.scopes.join(" ")}`)
              .set("response_type", "token")
              .set("show_dialog", "true");

    const url = `${SpotifyApi.authEndpoint}?${params.toString()}`;
    window.location.href = url;
  }

  logout ()  {
    sessionStorage.removeItem(this._spotifyToken);
    this._token = "";
    const url = "https://accounts.spotify.com/en/logout";
    const spotifyLogoutWindow = window.open(url, "Spotify Logout", "width=700,height=500,top=40,left=40");
    setTimeout(() => spotifyLogoutWindow.close(), 2000);
    this.router.navigate([this.loginUrl]);
  }
}
