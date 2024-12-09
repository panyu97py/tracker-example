import {Body, Controller,  Get, Inject, Post, Query} from "@nestjs/common";
import {EventConfigService} from "./event-config.service";
import {EventConfigCreateDto, EventConfigUpdateDto,EventConfigQueryParamsDto} from "./dtos";
@Controller('eventConfig')
export class EventConfigController {
    @Inject()
    private readonly eventConfigService: EventConfigService;

    @Get('/queryByPage')
    async getEventConfigByPage(@Query() params: EventConfigQueryParamsDto) {
        return await this.eventConfigService.getEventConfigByPage(params);
    }

    @Get('/detail')
    async getEventConfigDetail(@Query('id') id: string) {
        return await this.eventConfigService.getEventConfigById(id);
    }

    @Post('/create')
    async createEventConfig(@Body() body: EventConfigCreateDto) {
        await this.eventConfigService.createEventConfig(body);
        return true
    }

    @Post('/update')
    async updateEventConfig(@Body() body: EventConfigUpdateDto) {
        await this.eventConfigService.updateEventConfig(body);
        return true
    }

    @Post('/delete')
    async deleteEventConfig(@Body('id') id: string) {
        await this.eventConfigService.deleteEventConfig(id);
        return true
    }
}