import { describe, expect, it } from "vitest";
import { filterPlaces, readSaved, toggleSaved } from "../../src/model";
describe("discovery and local favorites", () => {
  it("searches Thai and English case-insensitively", () => {
    expect(
      filterPlaces("PAPER", "all", [], false, []).map((p) => p.id),
    ).toEqual(["paper"]);
    expect(filterPlaces("บ้านกระดาษ", "all", [], false, [])).toHaveLength(1);
  });
  it("intersects activity and every amenity", () => {
    expect(
      filterPlaces("", "work", ["เงียบ", "Wi-Fi"], false, []).map((p) => p.id),
    ).toEqual(["chapter"]);
  });
  it("handles empty results and saved-only searches", () => {
    expect(filterPlaces("ไม่มีที่นี้", "all", [], false, [])).toEqual([]);
    expect(
      filterPlaces("", "all", [], true, ["fern"]).map((p) => p.id),
    ).toEqual(["fern"]);
  });
  it("recovers from malformed, unavailable or unexpected local storage", () => {
    for (const v of ["{", "null", "42", "{}"])
      expect(readSaved({ getItem: () => v })).toEqual([]);
    expect(
      readSaved({
        getItem: () => {
          throw Error("disabled");
        },
      }),
    ).toEqual([]);
    expect(
      readSaved({ getItem: () => JSON.stringify(["paper", "unknown", 5]) }),
    ).toEqual(["paper"]);
  });
  it("toggles favorites without mutating the original", () => {
    const a = ["paper"];
    expect(toggleSaved(a, "fern")).toEqual(["paper", "fern"]);
    expect(toggleSaved(a, "paper")).toEqual([]);
    expect(a).toEqual(["paper"]);
  });
});
