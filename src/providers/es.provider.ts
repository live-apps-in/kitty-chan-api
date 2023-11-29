import { Client } from '@elastic/elasticsearch';
import { Provider } from '@nestjs/common';
import { PROVIDER_TYPES } from 'src/core/provider.types';

/**Elastic Search */
const esClient = new Client({ node: process.env.ES_HOST });

export const EsProvider: Provider = {
  provide: PROVIDER_TYPES.EsClient,
  useValue: esClient,
};
