import { Content } from './content';

describe('Notification content', () => {
  test('it shuld not be able to create a notification content with lass than 5 characters', () => {
    expect(() => new Content('----')).toThrow();
  });

  test('it shuld not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('-'.repeat(241))).toThrow();
  });

  test('it shuld be able to create a notification content', () => {
    const content = new Content('This is a content');

    expect(content).toBeTruthy();
  });
});
