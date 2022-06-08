import { PartialType } from "@nestjs/swagger";
import { FilterNotification } from "src/notifications/dto/filter-notification.dto";

export class FilterMessage extends PartialType(FilterNotification){}