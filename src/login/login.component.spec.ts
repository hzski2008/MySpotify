import { AuthService } from "shared/auth.service";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { By } from "@angular/platform-browser";
import { Component, DebugElement } from "@angular/core";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceStub;
  let loginEl: DebugElement;
  let authService: AuthService;

  beforeEach(async(() => {
    authServiceStub = {
      login: () => { }
    };

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [{ provide: AuthService, useValue: authServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginEl = fixture.debugElement.query(By.css("#SignIn"));
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call AuthService's login() when login button is clicked", () => {
    spyOn(authService, "login");

    expect(loginEl.nativeElement).toBeTruthy(); // login button is displayed
    loginEl.triggerEventHandler("click", null);
    fixture.detectChanges();
    expect(authService.login).toHaveBeenCalled();
  });
});
