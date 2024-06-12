
import { DataResponse } from './data-response.dto';
import { MetadataResponseDto } from './metadata-response.dto';

export class DataMetadataResponseDto<
  TData,
  TFilter,
> extends DataResponse<TData> {
  metadata: MetadataResponseDto<TFilter>;

  constructor(data?: TData, metadata?: MetadataResponseDto<TFilter>) {
    super(data);
    this.metadata = metadata;
  }
}
