import { TestBed } from "@angular/core/testing";
import { SpotifyApiService } from "./spotify-api.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe("SpotifyApiService", () => {
  let httpMock: HttpTestingController;
  let service: SpotifyApiService;
 const  baseUrl = "https://api.spotify.com/v1";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(SpotifyApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("getUserPlayLists should return user playLists ", () => {
    const dummyData = {
      playLists: [ "test1", "test2"]
      };

    service.getUserPlayLists().subscribe(playlists => {
      expect(playlists).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${baseUrl}/me/playlists`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });

  it("getUserProfile should return user data ", () => {
    const dummyData = {
      name: "John"
    };

    service.getUserProfile().subscribe(user => {
      expect(user).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${baseUrl}/me`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });

});
