import { createNotificationBody } from '@infra/http/dtos/create-notification-body';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendNotification } from 'src/application/use-cases/send-notification';

@Controller()
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

  @EventPattern('notifications.send')
  async handleSendNotification(@Payload() payload: createNotificationBody) {
    const { content, category, recipientId } = payload;
    await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });
  }
}
