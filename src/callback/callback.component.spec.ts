import { AuthService } from "shared/auth.service";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CallbackComponent } from "./callback.component";

describe("CallbackComponent", () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;
  let authServiceStub;

  authServiceStub = {
    navigate(path) { return path; },
    handleCallback() {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallbackComponent ],
      providers: [{ provide: AuthService, useValue: authServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
