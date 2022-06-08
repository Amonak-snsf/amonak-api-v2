import { PartialType } from '@nestjs/swagger';
import { CreatePublicationManagementDto } from './create-publication-management.dto';

export class UpdatePublicationManagementDto extends PartialType(CreatePublicationManagementDto) {}
