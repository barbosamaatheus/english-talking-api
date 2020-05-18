const calculatesApprovalRate = require("../../src/utils/calculatesApprovalRate");

it("Check function without approvals and disapprovals", () => {
  expect(calculatesApprovalRate()).toBe(0);
});

it("To vary the role with approvals and disapprovals", () => {
  const possibilities = {
    approvals: [1],
    disapprovals: [1],
  };

  expect(calculatesApprovalRate.call(possibilities)).toBe(50);
});

it("Check the function without the approvals", () => {
  const possibilities = {
    approvals: [],
    disapprovals: [1],
  };

  expect(calculatesApprovalRate.call(possibilities)).toBe(0);
});

it("Check function without disappprovals", () => {
  const possibilities = {
    approvals: [1],
    disapprovals: [],
  };

  expect(calculatesApprovalRate.call(possibilities)).toBe(100);
});
