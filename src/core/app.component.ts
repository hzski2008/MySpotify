import { Component,  OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: []
})
export class AppComponent implements OnInit {
  title = "MySpotify";

  public constructor(private titleService: Title ) { }

  ngOnInit() {
   this.titleService.setTitle( this.title );
  }
}
