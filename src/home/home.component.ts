import { Observable, forkJoin } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "shared/auth.service";
import { SpotifyApiService } from "shared/spotify-api.service";
import "syncfusion-javascript/Scripts/ej/web/ej.treeview.min";
import _ from "lodash";
import { switchMap, tap, concatMap } from "rxjs/operators";
import { Item, UserProfile, TrackDetails } from "./shared/album-interface";
import { Router } from "@angular/router";

declare const $: any;
declare const ej: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"]
})
export class HomeComponent implements OnInit {
  public playLists: Item[];
  public userProfile: UserProfile;
  private tracksById = {};
  public selectedTrack: TrackDetails;

  __testautomation__ = {
    parseTracks: (...args) => this.parseTracks.apply(this, args),
    getHierarchy: (...args) => this.getHierarchy.apply(this, args)
  };

  constructor(public auth: AuthService,
                      public spotifyApi: SpotifyApiService,
                      private router: Router) {}

  ngOnInit() {
    this.addPlayLists();
  }

  private addPlayLists() {
    this.getSpotifyData()
      .subscribe({
        next: value => {
          const tracks = this.parseTracks(value);
          const data = this.getHierarchy(tracks);
          this.drawHierarchy(data);
        },
        error: value => { // in case of http error(e.g token expired), negavate back to login page
          console.log(`Http Error: ${value}`);
          this.router.navigate(["./login"]);
        }
      });
    }

  private getSpotifyData(): Observable<any[]> {
    return this.spotifyApi.getUserProfile()
      .pipe(
        tap(res => {
          console.log("User profile:", res);
          this.userProfile = res as UserProfile;
          return res;
        }),
        switchMap(res => this.spotifyApi.getPlayListsById((res as UserProfile).id) ),
        tap(res => {
          console.log("User playlists:", res);
          this.playLists = (res as any).items;
          return res;
        }),
        switchMap(res => {
          console.log("items", (res as any).items);
          const obs = ((res as any).items as any).map(ob => this.spotifyApi.getTracks(ob.id));
          return forkJoin(obs);
        })
      );
  }

  private parseTracks(tracks) {
    const clonedPlayLists = _.cloneDeep(this.playLists);
    for (const item of clonedPlayLists) {
      for (const obj of tracks) {
        if ((obj.href as string).includes(item.id)) {
          (item as any).expanded = true;
          (item as any).hasChild = true;
          (item as any).child = this.AddTracks(_.get(obj, "tracks.items"));
        }
      }
    }
    return clonedPlayLists;
  }

  private AddTracks(tracks: TrackDetails[]) {
    const children = _.cloneDeep(tracks);
    for (const child of children) {
      child["name"] = _.get(child, "track.name");
      child["id"] = _.get(child, "track.id");
      this.tracksById[_.get(child, "track.id")] = _.get(child, "track");
      if (!this.selectedTrack) {
        this.selectedTrack = _.get(child, "track");
      }
    }
    return children;
  }

  private drawHierarchy (data) {
    $("#playListTree").ejTreeView({
      fields: {
        dataSource: data,
        id: "id",
        parentId: "pid",
        text: "name",
        hasChild: "hasChild",
        expanded: "expanded",
      },
      // cssClass: "tree-tree",
      nodeSelect:  (...args) => this.selectTrack.apply(this, args),
    });
  }

  private selectTrack(args) {
    this.selectedTrack = this.tracksById[args.id];
  }

  private getHierarchy (data) {
    const root = {
      id: 0,
      name: `${_.get(this, "userProfile.display_name", "loading...")}'s playlist`,
      expanded: true,
      selected: true,
    };
    for (const item of data) {
      item["hasChild"] = true;
      item["expanded"] = true;
    }
    root["child"] = data;
    return [root];
  }

  public handleClick(event) {
    if ($("#profileForm").hasClass("collapse in") && ($(event.target).parents("#profileForm").length === 0)) {
      $("#profileToggle").click();
    }
  }
}
