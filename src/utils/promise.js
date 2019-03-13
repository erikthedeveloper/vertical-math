export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const randDelay = (min, max) =>
  delay(Math.min(min, Math.random() * max));
