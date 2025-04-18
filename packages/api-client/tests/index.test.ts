import { expect, test } from 'vitest';
import { helloWorld } from '../src/index';

test('helloWorld', async () => {
  const [error, data] = await helloWorld.helloWorldControllerGetHello({ name: 'John' });
  if (error) {
    expect(data.message).toBe('error');
    return;
  }
  expect(data).toStrictEqual({message: 'Hello John'});
  expect(error).toBeNull();
});
