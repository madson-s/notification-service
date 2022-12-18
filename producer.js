/* eslint-disable @typescript-eslint/no-var-requires */
const { Kafka } = require('kafkajs');
const { randomUUID } = require('crypto');

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['stirring-wasp-8297-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'c3RpcnJpbmctd2FzcC04Mjk3JOAp4O2aWfvP7BRWfjbuAY4m78BRL_QmDpGOGko',
      password:
        'uRBjgSzJ_uYNFmzb2K9lbjjuznWw7ByZ1s7ZwdRDf24YuSFvjkmzRR-Tebk9gpi5Dmnxfw==',
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: 'notifications.send',
    messages: [
      {
        value: JSON.stringify({
          recipientId: randomUUID(),
          content: 'this is a content by kafka',
          category: 'social',
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
