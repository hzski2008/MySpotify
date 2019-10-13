import { Component, OnInit} from "@angular/core";
import { AuthService} from "shared/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) { }
  ngOnInit() {}
}
