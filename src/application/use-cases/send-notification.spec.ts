import { InMemoryNotificationsRepository } from '../../../test/in-memory-notification-respository';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  test('it shuld be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const notification = await sendNotification.execute({
      content: 'This is a content',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notification).toBeTruthy();
  });
});
