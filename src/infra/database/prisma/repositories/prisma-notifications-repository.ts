import { Injectable } from '@nestjs/common';
import { Content } from 'src/application/entities/content';
import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const data = {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    };

    await this.prismaService.notification.create({ data });
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) return null;

    return new Notification(
      {
        category: notification.category,
        content: new Content(notification.content),
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        canceledAt: notification.canceledAt,
        createdAt: notification.createdAt,
      },
      notification.id,
    );
  }

  async findManyByrecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId: recipientId,
      },
    });

    return notifications.map(
      (notification) =>
        new Notification(
          {
            category: notification.category,
            content: new Content(notification.content),
            recipientId: notification.recipientId,
            readAt: notification.readAt,
            canceledAt: notification.canceledAt,
            createdAt: notification.createdAt,
          },
          notification.id,
        ),
    );
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: { recipientId: recipientId },
    });

    return count;
  }

  async save(notification: Notification): Promise<void> {
    const data = {
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    };

    await this.prismaService.notification.update({
      where: { id: notification.id },
      data: data,
    });
  }
}
