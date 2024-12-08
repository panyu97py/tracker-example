import {Body, Headers, Controller, Inject, Post} from "@nestjs/common";
import {EventDataService} from "./event-data.service";
import {EventDataDto} from "@/modules/event-data/event-data.dto";

@Controller('eventData')
export class EventDataController {
    @Inject()
    private readonly eventDataService: EventDataService;

    @Post('/report')
    async appendEventData(@Headers() headers: Record<string, any>, @Body() eventDataList: EventDataDto[]): Promise<boolean> {
        const sessionId = headers['tracker-session-id'];
        const deviceId = headers['tracker-device-id'];
        const finalEventDataList = eventDataList.map(eventData => ({...eventData, sessionId, deviceId}))
        await this.eventDataService.appendEventData(finalEventDataList);
        return true
    }
}