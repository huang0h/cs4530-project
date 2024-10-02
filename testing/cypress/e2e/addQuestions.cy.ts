import { Q1_DESC, Q2_DESC, Q3_DESC, Q4_DESC } from '../../../server/data/posts_strings';

describe("Cypress Tests to verify asking new questions", () => {
  beforeEach(() => {
    // Seed the database before each test
    cy.exec("npx ts-node ../server/populate_db.ts mongodb://127.0.0.1:27017/fake_so");
  });

  afterEach(() => {
    // Clear the database after each test
    cy.exec("npx ts-node ../server/remove_db.ts mongodb://127.0.0.1:27017/fake_so");
  });

  it("2.1 | Ask a Question creates and displays expected meta data", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question Q1");
    cy.get("#formTextInput").type("Test Question Q1 Text T1");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("new user 32");
    cy.contains("Post Question").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("5 questions");
    cy.contains("new user 32 asked 0 seconds ago");
    const answers = [
      "0 answers",
      "1 answers",
      "2 answers",
      "3 answers",
      "2 answers",
    ];
    const views = [
      "0 views",
      "103 views",
      "200 views",
      "121 views",
      "10 views",
    ];
    cy.get(".postStats").each(($el, index, $list) => {
      cy.wrap($el).should("contain", answers[index]);
      cy.wrap($el).should("contain", views[index]);
    });
    cy.contains("Unanswered").click();
    cy.get(".postTitle").should("have.length", 1);
    cy.contains("1 question");
  });

  it("2.2 | Ask a Question with empty title shows error", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Ask a Question").click();
    cy.get("#formTextInput").type("Test Question 1 Text Q1");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("new user 32");
    cy.contains("Post Question").click();
    cy.contains("Title cannot be empty");
  });
});