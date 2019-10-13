import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home-content",
  templateUrl: "./home-content.component.html",
  styleUrls: ["./home-content.component.less"]
})
export class HomeContentComponent implements OnInit {
  @Input() track: any;
  constructor() { }

  ngOnInit() {
  }
}
