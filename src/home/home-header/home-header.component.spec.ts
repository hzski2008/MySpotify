import { AuthService } from "shared/auth.service";
import { DefaultPipe } from "home/shared/default.pipe";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeHeaderComponent } from "./home-header.component";
import { By } from "@angular/platform-browser";
import { Component, DebugElement } from "@angular/core";

describe("HomeHeaderComponent", () => {
  let component: HomeHeaderComponent;
  let fixture: ComponentFixture<HomeHeaderComponent>;
  let authService: AuthService;
  let authServiceStub;
  let logoutEl: DebugElement;

  authServiceStub = {
    logout: () => {},
   };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHeaderComponent, DefaultPipe ],
      providers: [{ provide: AuthService, useValue: authServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHeaderComponent);
    component = fixture.componentInstance;
    logoutEl = fixture.debugElement.query(By.css(".logout-button"));
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call AuthService's logout() when logout button is clicked", () => {
    spyOn(authService, "logout");

    expect(logoutEl.nativeElement).toBeTruthy(); // logout button is displayed
    logoutEl.triggerEventHandler("click", null);
    // fixture.detectChanges();
    expect(authService.logout).toHaveBeenCalled();
  });
});
