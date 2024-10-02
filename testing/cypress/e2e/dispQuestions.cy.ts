import { Q1_DESC, Q2_DESC, Q3_DESC, Q4_DESC } from '../../../server/data/posts_strings';

describe("Cypress Tests to verify order of questions displayed", () => {
  beforeEach(() => {
    // Seed the database before each test
    cy.exec("npx ts-node ../server/populate_db.ts mongodb://127.0.0.1:27017/fake_so");
  });

  afterEach(() => {
    // Clear the database after each test
    cy.exec("npx ts-node ../server/remove_db.ts mongodb://127.0.0.1:27017/fake_so");
  });

  it('1.1 | Adds three questions and one answer, then click "Questions", then click unanswered button, verifies the sequence', () => {
    cy.visit("http://localhost:3000");

    // add a question
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question A");
    cy.get("#formTextInput").type("Test Question A Text");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("mks1");
    cy.contains("Post Question").click();

    // add another question
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question B");
    cy.get("#formTextInput").type("Test Question B Text");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("mks2");
    cy.contains("Post Question").click();

    // add another question
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question C");
    cy.get("#formTextInput").type("Test Question C Text");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("mks3");
    cy.contains("Post Question").click();

    // add an answer to question A
    cy.contains("Test Question A").click();
    cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type("abc3");
    cy.get("#answerTextInput").type("Answer Question A");
    cy.contains("Post Answer").click();

    // go back to main page
    cy.contains("Questions").click();

    // clicks unanswered
    cy.contains("Unanswered").click();
    const qTitles = ["Test Question C", "Test Question B"];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("1.2 | Check if questions are displayed in descending order of dates.", () => {
    const qTitles = [
      Q4_DESC,
      Q3_DESC,
      Q2_DESC,
      Q1_DESC,
    ];

    cy.visit("http://localhost:3000");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("1.3 | successfully shows all questions in model in active order", () => {
    const qTitles = [
      Q1_DESC,
      Q2_DESC,
      Q4_DESC,
      Q3_DESC,
    ];
    cy.visit("http://localhost:3000");
    cy.contains("Active").click();
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });
});