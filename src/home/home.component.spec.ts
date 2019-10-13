import { of, throwError } from "rxjs";
import { SpotifyApiService } from "shared/spotify-api.service";
import { AuthService } from "shared/auth.service";
import { TrackDetails } from "./shared/album-interface";
import { async, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { HomeContentComponent } from "./home-content/home-content.component";
import { DefaultPipe } from "./shared/default.pipe";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestData } from "./test-data.class";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceStub;
  let spotifyService: SpotifyApiService;
  let router: Router;

  authServiceStub = {
    logout: () => {},
   };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, HomeHeaderComponent, HomeContentComponent, DefaultPipe ],
      providers: [
        SpotifyApiService,
        { provide: AuthService, useValue: authServiceStub}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    spotifyService =  TestBed.get(SpotifyApiService);
    router = TestBed.get(Router);
  });

  it("should create", () => {
    component.selectedTrack = {} as any;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // test private methods parseTracks() and getHierarchy()
  it("should build correct data structure for rendering in Html", () => {
    spyOn<any>(spotifyService, "getUserProfile").and.returnValue(of(TestData.userProfile));
    spyOn<any>(spotifyService,  "getTracks").and.callFake((id) => {
      if (id === TestData.playLists1Id) {
        return TestData.tracks[0];
      } else {
        return TestData.tracks[1];
      }
    });
    spyOn<any>(spotifyService, "getPlayListsById").and.returnValue(of(TestData.playLists));
    component.ngOnInit();
    expect(component.userProfile as any ).toEqual(TestData.userProfile);
    let data = component.__testautomation__.parseTracks(TestData.tracks);
    data = component.__testautomation__.getHierarchy(data);
    expect(data).toEqual(TestData.expected);
  });

  it("should navigate back to login page in case of http error", fakeAsync(() => {
    spyOn(router, "navigate");
    spyOn<any>(spotifyService, "getUserProfile").and.callFake(() => {
      return throwError("This is an error!");
    });
    component.ngOnInit();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(["./login"]);
  }));

});
