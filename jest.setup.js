// Suppress Node.js deprecation warnings
const originalWarn = process.emitWarning;
process.emitWarning = (...args) => {
  if (args[2] && args[2].code === 'DEP0040') return;
  return originalWarn.apply(process, args);
}; 