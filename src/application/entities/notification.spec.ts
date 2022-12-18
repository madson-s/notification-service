import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  test('it shuld be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('This is a content'),
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
