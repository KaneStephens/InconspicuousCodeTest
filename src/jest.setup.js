import { setLogger } from 'react-query';

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});