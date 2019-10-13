import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material";
import { LoginComponent } from "login/login.component";
import { HomeComponent } from "home/home.component";
import { CallbackComponent } from "callback/callback.component";
import { AuthGuard } from "shared/auth.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  { path : "callback", component: CallbackComponent},
  { path: "", redirectTo: "login", pathMatch: "full"},
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
