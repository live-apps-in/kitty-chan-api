import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { Client as EsClient } from '@elastic/elasticsearch';

@Injectable()
export class EsService {
  constructor(
    @Inject(PROVIDER_TYPES.EsClient) private readonly esClient: EsClient,
  ) {}

  async createOrUpdateIndex(index: string, id: string, body: any) {
    await this.esClient.index({ index, id, body });
  }
}
