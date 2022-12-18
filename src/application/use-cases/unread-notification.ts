import { NotificationsRepository } from '../repositories/notifications-repository';
import { Notification } from '../entities/notification';
import { Injectable } from '@nestjs/common/decorators';

interface UnreadNotificationRequest {
  notificationId: string;
}

interface UnreadNotificationResponse {
  notification: Notification;
}

@Injectable()
export class UnreadNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) throw new Error('Not found');

    notification.unread();

    await this.notificationsRepository.save(notification);

    return { notification };
  }
}
