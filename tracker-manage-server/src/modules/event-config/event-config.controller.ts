import {Body, Controller, Delete, Get, Inject, Param, Post} from "@nestjs/common";
import {PaginationReqDto} from "@/shared/dtos";
import {EventConfigService} from "./event-config.service";
import {EventConfigCreateDto, EventConfigUpdateDto} from "./dtos";

@Controller('eventConfig')
export class EventConfigController {
    @Inject()
    private readonly eventConfigService: EventConfigService;

    @Get('/queryByPage')
    async getEventConfigByPage(@Param() params: PaginationReqDto) {
        return await this.eventConfigService.getEventConfigByPage(params);
    }

    @Get('/detail')
    async getEventConfigDetail(@Param('id') id: string) {
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

    @Delete('/delete')
    async deleteEventConfig(@Param('id') id: string) {
        await this.eventConfigService.deleteEventConfig(id);
        return true
    }
}