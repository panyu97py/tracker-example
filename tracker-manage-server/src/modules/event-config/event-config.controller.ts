import {Body, Controller, Get, Inject, Param, Post} from "@nestjs/common";
import {PaginationReqDto} from "@/shared/dtos";
import {EventConfigService} from "./event-config.service";
import {CreateEventConfigDto, UpdateEventConfigDto} from "./dtos";

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

    @Post('/update')
    async updateEventConfig(@Body() body: UpdateEventConfigDto) {
        await this.eventConfigService.updateEventConfig(body);
        return true
    }

    @Post('/delete')
    async deleteEventConfig(@Param('id') id: string) {
        await this.eventConfigService.deleteEventConfig(id);
        return true
    }
}