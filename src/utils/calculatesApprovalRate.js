module.exports = function calculatesApprovalRate() {
  const positive = this.approvals || [];
  const negative = this.disapprovals || [];

  const total = positive.length + negative.length;

  return parseInt((positive.length / total) * 100, 10) || 0;
};
