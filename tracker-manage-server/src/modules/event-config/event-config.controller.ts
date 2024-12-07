import {Controller, Get, Inject} from "@nestjs/common";
import {EventConfigService} from "./event-config.service";
import {PaginationReqDto} from "@/shared/dtos";

@Controller('eventConfig')
export class EventConfigController {
    @Inject()
    private readonly eventConfigService: EventConfigService;

    @Get('/getEventConfigByPage')
    async getEventConfigByPage(params: PaginationReqDto) {
        return await this.eventConfigService.getEventConfigByPage(params);
    }
}