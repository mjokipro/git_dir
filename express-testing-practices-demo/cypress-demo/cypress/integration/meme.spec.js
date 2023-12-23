describe("Meme Generator", function() {
  beforeEach(function() {
    cy.visit("/index.html", { timeout: 5000 });
  });

  it("loads correctly", function() {
    cy.get("#meme-form").should("exist");
  });

  it("adds a meme when the form is submitted", function() {
    cy.get(".meme").should("not.exist");
    addMeme();
    cy.get(".meme").should("exist");
  });

  it("removes a meme when the meme is clicked", function() {
    addMeme();
    cy.get(".meme").click();
    cy.get(".meme").should("not.exist");
  });
  // end tests

  function addMeme() {
    cy.get("#image").type(
      "https://www.meme-arsenal.com/memes/6d415311d80dbda72c104f875d3ff23c.jpg"
    );
    cy.get("#text_above").type("OMG WUT");
    cy.get("#text_below").type("CYPRESS IS AWESOME");
    cy.get("#meme-form").submit();
  }
});
