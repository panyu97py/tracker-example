import {Body, Controller, Get, Inject, Param, Post} from "@nestjs/common";
import {PaginationReqDto} from "@/shared/dtos";
import {EventConfigService} from "./event-config.service";
import {CreateEventConfigDto} from "./dtos";

@Controller('eventConfig')
export class EventConfigController {
    @Inject()
    private readonly eventConfigService: EventConfigService;

    @Get('/queryByPage')
    async getEventConfigByPage(@Param() params: PaginationReqDto) {
        return await this.eventConfigService.getEventConfigByPage(params);
    }

    @Post('/create')
    async createEventConfig(@Body() body: CreateEventConfigDto) {
        await this.eventConfigService.createEventConfig(body);
        return true
    }
}