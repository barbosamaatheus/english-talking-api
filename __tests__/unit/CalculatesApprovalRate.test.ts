import calculatesApprovalRate from "../../src/utils/CalculatesApprovalRate";

describe('Test calculate Approvals Rate', () => {
  it("Check function without approvals and disapprovals", () => {
    const rate = calculatesApprovalRate.exec({
      approvals: 0,
      disapprovals: 0
    });
  
    expect(rate).toBe(0);
  });
  
  it("To vary the role with approvals and disapprovals", () => {
    const rate = calculatesApprovalRate.exec({
      approvals: 1,
      disapprovals: 1,
    });
  
    expect(rate).toBe(50);
  });
  
  it("Check the function without the approvals", () => {
    const rate = calculatesApprovalRate.exec({
      approvals: 0,
      disapprovals: 1,
    });
  
    expect(rate).toBe(0);
  });
  
  it("Check function without disappprovals", () => {
    const rate = calculatesApprovalRate.exec({
      approvals: 1,
      disapprovals: 0,
    });
  
    expect(rate).toBe(100);
  });
})

