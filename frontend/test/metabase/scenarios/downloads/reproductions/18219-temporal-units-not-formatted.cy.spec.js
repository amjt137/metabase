import { restore, downloadAndAssert } from "__support__/e2e/cypress";
import { SAMPLE_DATABASE } from "__support__/e2e/cypress_sample_database";

const { ORDERS, ORDERS_ID } = SAMPLE_DATABASE;

const questionDetails = {
  name: "18219",
  query: {
    "source-table": ORDERS_ID,
    aggregation: [["count"]],
    breakout: [["field", ORDERS.CREATED_AT, { "temporal-unit": "year" }]],
  },
};

const testCases = ["csv", "xlsx"];

describe.skip("issue 18219", () => {
  beforeEach(() => {
    restore();
    cy.signInAsAdmin();
  });

  testCases.forEach(fileType => {
    it("should format temporal units on export (metabase#18219)", () => {
      cy.createQuestion(questionDetails).then(
        ({ body: { id: questionId } }) => {
          cy.intercept("POST", `/api/card/${questionId}/query`).as("cardQuery");
          cy.visit(`/question/${questionId}`);

          // Wait for `result_metadata` to load
          cy.wait("@cardQuery");

          cy.findByText("Created At: Year");
          cy.findByText("2016");
          cy.findByText("744");

          downloadAndAssert({ fileType, questionId, raw: true }, assertion);
        },
      );
    });

    function assertion(sheet) {
      expect(sheet["A1"].v).to.eq("Created At: Year");

      if (fileType === "csv") {
        expect(sheet["A2"].v).to.eq("2016");
      }

      if (fileType === "xlsx") {
        /**
         * Depending on how we end up solving this issue,
         * the following assertion on the cell type might not be correct.
         * It's very likely we'll format temporal breakouts as strings.
         * I.e. we have to take into account Q1, Q2, etc.
         */
        // expect(A2.t).to.eq("n");

        /**
         * Because of the excel date format, we cannot assert on the raw value `v`.
         * Rather, we have to do it on the parsed value `w`.
         */
        expect(sheet["A2"].w).to.eq("2016");
      }
    }
  });
});