import { Schema } from "mongoose";

import calculatesApprovalRate from "../../src/utils/calculatesApprovalRate";

it("Check function without approvals and disapprovals", () => {
  const rate = calculatesApprovalRate({
    approvals: [],
    disapprovals: [],
  });

  expect(rate).toBe(0);
});

it("To vary the role with approvals and disapprovals", () => {
  const rate = calculatesApprovalRate({
    approvals: [new Schema.Types.ObjectId("1")],
    disapprovals: [new Schema.Types.ObjectId("1")],
  });

  expect(rate).toBe(50);
});

it("Check the function without the approvals", () => {
  const rate = calculatesApprovalRate({
    approvals: [],
    disapprovals: [new Schema.Types.ObjectId("1")],
  });

  expect(rate).toBe(0);
});

it("Check function without disappprovals", () => {
  const rate = calculatesApprovalRate({
    approvals: [new Schema.Types.ObjectId("1")],
    disapprovals: [],
  });

  expect(rate).toBe(100);
});
