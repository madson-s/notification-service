import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        brokers: ['stirring-wasp-8297-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'c3RpcnJpbmctd2FzcC04Mjk3JOAp4O2aWfvP7BRWfjbuAY4m78BRL_QmDpGOGko',
          password:
            'uRBjgSzJ_uYNFmzb2K9lbjjuznWw7ByZ1s7ZwdRDf24YuSFvjkmzRR-Tebk9gpi5Dmnxfw==',
        },
        ssl: true,
      },
    });
  }

  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }
}
