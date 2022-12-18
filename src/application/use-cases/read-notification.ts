import { NotificationsRepository } from '../repositories/notifications-repository';
import { Notification } from '../entities/notification';
import { Injectable } from '@nestjs/common/decorators';

interface ReadNotificationRequest {
  notificationId: string;
}

interface ReadNotificationResponse {
  notification: Notification;
}

@Injectable()
export class ReadNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) throw new Error('Not found');

    notification.read();

    await this.notificationsRepository.save(notification);

    return { notification };
  }
}
