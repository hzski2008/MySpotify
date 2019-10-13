import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";


describe("AuthService", () => {
  let authService: AuthService ;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  afterEach(() => {
    authService = null;
    sessionStorage.removeItem("spotify-token");
  });

  it("authenticated should return true when there is a token", () => {
    sessionStorage.setItem("spotify-token", "1234");
    expect(authService.authenticated).toBeTruthy();
  });

  it("authenticated should return false when there is no token", () => {
    expect(authService.authenticated).toBeFalsy();
  });

  xit("navigate to login when logout", fakeAsync(() => {
    spyOn(router, "navigate");
    authService.logout();
    tick();
    // jasmine.clock().tick(10);
    expect(router.navigate).toHaveBeenCalledWith(["./login"]);
  }));

});
