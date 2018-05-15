export default (
  getPromise,
  retryCount = Infinity,
  { intervalStep = 1000, incrementalTime = true, logger } = {},
) => {
  const log = logger ? logger : () => {};
  let tries = 1;
  let step = intervalStep;
  return new Promise((resolve, reject) => {
    const run = () => {
      if (tries > 1) {
        log(`Promise Retry: attempt number ${tries}`);
      }
      getPromise()
        .then(r => {
          log(`Promise Retry: Success`);
          resolve(r);
        })
        .catch(r => {
          log(`${tries} rejection with `, r);
          if (tries < retryCount) {
            tries++;
            setTimeout(run, step);
            log(`Promise Retry: Retry after ${step / 1000} seconds...`);
            if (incrementalTime) {
              step *= 2;
            }
          } else {
            log('Promise Retry: Give up');
            reject(r);
          }
        });
    };

    run();
  });
};
