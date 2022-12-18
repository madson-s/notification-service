import { Content } from '../../src/application/entities/content';
import { Notification } from '../../src/application/entities/notification';

type Override = Partial<Notification>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('This is a content'),
    category: 'social',
    recipientId: 'example-recipient-id',
    ...override,
  });
}
