import { PickType } from '@nestjs/swagger';
import { CreatePublicationDto } from './create-publication.dto';

export class UpdatePublicationDto extends PickType(CreatePublicationDto, ['status'] as const) {}
