import { Component } from "@angular/core";
import { AuthService } from "shared/auth.service";

declare const $: any;

@Component({
  selector: "app-callback",
  templateUrl: "./callback.component.html",
  styleUrls: []
})
export class CallbackComponent {
  constructor(private auth: AuthService) {
    $(document).ready(() => {
        this.auth.handleCallback();
    });
  }
}
