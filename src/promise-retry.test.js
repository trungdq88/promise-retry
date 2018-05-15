import retry from './promise-retry.js';

describe('promise-retry', () => {
  it('should work', async () => {
    const rejectValue = Math.random();
    const retryCount = Math.floor(Math.random() * 10 + 1);
    const getPromise = jest
      .fn()
      .mockImplementation(() => Promise.reject(rejectValue));
    await retry(getPromise, retryCount, {
      intervalStep: 1,
      logger: null,
    }).catch(_ => _);
    expect(getPromise).toHaveBeenCalledTimes(retryCount);
  });
});
