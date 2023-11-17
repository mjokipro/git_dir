"use strict";


// almost-"unit tests" (they call AJAX, because axios isn't mocked.)

describe("getShowsByTerm", function () {
  it("should successfully search", async function () {
    const shows = await getShowsByTerm("bletchley");
    const ids = shows.map(s => s.id);
    expect(ids).toEqual([1767, 37008]);
  });

  it("should return nothing for bad search", async function () {
    const shows = await getShowsByTerm("squeamish ossifrage");
    expect(shows).toEqual([]);
  });
});

describe("getEpisodesOfShow", function () {

  it("should successfully search", async function () {
    const episodes = await getEpisodesOfShow(1767);
    expect(episodes.length).toEqual(7);
  });

  it("should handle missing shows", async function () {
    try {
      const episodes = await getEpisodesOfShow(0);
    } catch (err) {
      expect(err.message).toContain("404");
    }
  });
});


// an example that is really a unit test, since we mock out axios

describe("getEpisodesOfShow [mocked]", function () {

  it("should successfully search", async function () {
    const mock = new AxiosMockAdapter(axios);
    mock.onGet(`${TVMAZE_API_URL}shows/1000/episodes`)
      .reply(200, [{ id: 1, name: "A", season: "B", number: 10 }]);

    const episodes = await getEpisodesOfShow(1000);
    expect(episodes).toEqual([{
      id: 1,
      name: "A",
      season: "B",
      number: 10,
    }]);

    // "un-mock" axios so it works normally
    mock.restore();
  });
});


// to handle testing the actual UI

describe("search form submission", function () {

  it("should search", async function () {
    // see if our search function is called when the button is clicked
    spyOn(window, "searchForShowAndDisplay");

    // make a real click in the browser
    $("#searchForm-term").val("bletchley");
    $searchForm.trigger("submit");

    // make sure it got called
    expect(searchForShowAndDisplay).toHaveBeenCalledTimes(1);
  });
})

