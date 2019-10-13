import { AuthService } from "shared/auth.service";
import { Component, OnInit, Input } from "@angular/core";

declare const $: any;

@Component({
  selector: "app-home-header",
  templateUrl: "./home-header.component.html",
  styleUrls: ["./home-header.component.less"]
})
export class HomeHeaderComponent implements OnInit {
  @Input() userProfile: any;
  constructor(public auth: AuthService) {
  }

  ngOnInit() { }

  public getImageUrl() {
    return this.userProfile.images[0].url;
  }
}
