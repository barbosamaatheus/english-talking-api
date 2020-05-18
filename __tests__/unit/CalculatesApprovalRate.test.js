const calculatesApprovalRate = require("../../src/utils/calculatesApprovalRate");

it("check function without approvals and disapprovals", () => {
  const response = calculatesApprovalRate();

  expect(response).toBe(0);
});

it("To vary the role with approvals and disapprovals", () => {
  const possibilities = {
    approvals: [1],
    disapprovals: [1],
  };

  expect(calculatesApprovalRate.call(possibilities)).toBe(50);
});

it("check the function without the approvals", () => {
  const possibilities = {
    approvals: [],
    disapprovals: [1],
  };

  expect(calculatesApprovalRate.call(possibilities)).toBe(0);
});

it("check function without disappprovals", () => {
  const possibilities = {
    approvals: [1],
    disapprovals: [],
  };

  expect(calculatesApprovalRate.call(possibilities)).toBe(100);
});
