export {};

describe("Character App E2E Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should search for a character", () => {
    cy.get('input[placeholder="Enter search"]').type("Luke Skywalker");
    cy.get("button").contains("Search").click();

    cy.get('[data-testid="character-card"]').should(
      "contain",
      "Luke Skywalker"
    );
  });

  it("should navigate to character details", () => {
    cy.get('input[placeholder="Enter search"]').type("Luke Skywalker");
    cy.get("button").contains("Search").click();
    cy.get('[data-testid="character-card"]').contains("View Details").click();

    cy.get("h2").contains("Luke Skywalker").should("be.visible");
    cy.get("p").contains("Gender: male").should("be.visible");
    cy.get("p").contains("Home Planet: Tatooine").should("be.visible");
  });

  it("should add a character to favourites", () => {
    cy.get('input[placeholder="Enter search"]').type("Luke Skywalker");
    cy.get("button").contains("Search").click();
    cy.get('[data-testid="character-card"]').contains("View Details").click();
    cy.get("button").contains("Add to Favourites").click();

    cy.visit("http://localhost:3000/favourites");
    cy.get('[data-testid="character-card"]').should(
      "contain",
      "Luke Skywalker"
    );
  });
});
