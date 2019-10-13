import { DefaultPipe } from "home/shared/default.pipe";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeContentComponent } from "./home-content.component";
import { MatButtonModule, MatToolbarModule } from "@angular/material";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";

describe("HomeContentComponent", () => {
  let component: HomeContentComponent;
  let fixture: ComponentFixture<HomeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeContentComponent, DefaultPipe ],
      imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    component.track = {album: {name: "test"}};
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
