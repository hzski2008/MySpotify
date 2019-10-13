import { DefaultPipe } from "./default.pipe";

describe("DefaultPipe", () => {
  let pipe: DefaultPipe;

  beforeEach(() => {
    pipe = new DefaultPipe();
  });

  it("should return default string when object path does not exist", () => {
    expect(pipe.transform({}, "foo")).toBe("loading...");
});

  it("should return path value when object path exists", () => {
    const track = {name: "shape of my heart"};
    expect(pipe.transform(track, "name")).toBe(track.name);
  });

  it("should return given fallback string if object path does not exist", () => {
    const track = {artists: "sting"};
    expect(pipe.transform(track, "name", "not available")).toBe("not available");
  });
});
