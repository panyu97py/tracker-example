import {Body, Controller, Inject, Post} from "@nestjs/common";
import {EventDataService} from "./event-data.service";
import {EventDataDto} from "@/modules/event-data/event-data.dto";

@Controller('eventData')
export class EventDataController {
    @Inject()
    private readonly eventDataService: EventDataService;

    @Post('/report')
    async appendEventData(@Body() eventDataList: EventDataDto[]): Promise<boolean> {
        await this.eventDataService.appendEventData(eventDataList);
        return true
    }
}