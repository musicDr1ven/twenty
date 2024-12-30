module.exports = {
  '*.{js,ts,tsx}': 'yarn prettier:commit',
  '*.{ts,tsx}': () => 'yarn typecheck && yarn tslint',
};
