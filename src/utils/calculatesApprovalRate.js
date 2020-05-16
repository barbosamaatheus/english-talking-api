exports.default = function CalculatesApprovalRate() {
  const total = this.approvals.length + this.disapprovals.length;

  if (!this.approvals.length) return 0;
  return parseInt((this.approvals.length / total) * 100, 10);
};
