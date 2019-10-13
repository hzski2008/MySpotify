import { TestBed, async, inject } from "@angular/core/testing";
import { AuthService } from "shared/auth.service";
import { AuthGuard } from "./auth.guard";

class MockRouter {
  navigate(path) {}
}

describe("AuthGuard", () => {
  let authGuard: AuthGuard;
  let authService;
  let router;

  beforeEach(() => {
    router = new MockRouter();
    authService = new AuthService(router);
    authGuard = new AuthGuard(authService, router);
  });

  afterEach(() => {
    authService = null;
    authGuard = null;
    sessionStorage.removeItem("spotify-token");
  });

  it("should return true for an authenticated user", () => {
    sessionStorage.setItem("spotify-token", "1234");
    expect(authGuard.canActivate()).toEqual(true);
  });

  it("should navigate to login for not authenticated user", () => {
    spyOn(router, "navigate");
    expect(authGuard.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(["./login"]);
  });

});
