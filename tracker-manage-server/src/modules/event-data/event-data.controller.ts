import {Body, Headers, Controller, Inject, Post} from "@nestjs/common";
import {EventDataService} from "./event-data.service";
import {EventDataDto} from "@/modules/event-data/event-data.dto";

@Controller('eventData')
export class EventDataController {
    @Inject()
    private readonly eventDataService: EventDataService;

    @Post('/report')
    async appendEventData(@Headers() headers: any, @Body() eventDataList: EventDataDto[]): Promise<boolean> {
        console.log("appendEventData", {headers});
        await this.eventDataService.appendEventData(eventDataList);
        return true
    }
}