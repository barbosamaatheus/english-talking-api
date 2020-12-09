import calculatesApprovalRate from "../../src/utils/calculatesApprovalRate";
import User from "../../src/models/User";

it("Check function without approvals and disapprovals", () => {
  const rate = calculatesApprovalRate({
    approvals: [],
    disapprovals: [],
  });

  expect(rate).toBe(0);
});

it("To vary the role with approvals and disapprovals", () => {
  const rate = calculatesApprovalRate({
    approvals: [new User()],
    disapprovals: [new User()],
  });

  expect(rate).toBe(50);
});

it("Check the function without the approvals", () => {
  const rate = calculatesApprovalRate({
    approvals: [],
    disapprovals: [new User()],
  });

  expect(rate).toBe(0);
});

it("Check function without disappprovals", () => {
  const rate = calculatesApprovalRate({
    approvals: [new User()],
    disapprovals: [],
  });

  expect(rate).toBe(100);
});
