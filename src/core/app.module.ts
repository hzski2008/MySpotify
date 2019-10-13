import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { MatButtonModule, MatToolbarModule } from "@angular/material";
import { MatListModule} from "@angular/material/list";
import { MatIconModule} from "@angular/material/icon";
import { MatDividerModule} from "@angular/material/divider";
import { MatTooltipModule} from "@angular/material/tooltip";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "login/login.component";
import { HomeComponent } from "home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CallbackComponent } from "callback/callback.component";
import { HomeHeaderComponent } from "home/home-header/home-header.component";
import { AuthGuard} from "shared/auth.guard";
import "bootstrap-submenu";
import "bootstrap";
import { DefaultPipe } from "home/shared/default.pipe";
import { HomeContentComponent } from "home/home-content/home-content.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CallbackComponent,
    HomeHeaderComponent,
    DefaultPipe,
    HomeContentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
