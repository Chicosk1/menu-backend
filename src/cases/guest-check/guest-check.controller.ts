import { Body, Controller, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateGuestCheckDto } from "./dto/create-guest-check";
import { UpdateGuestCheckDto } from "./dto/update-guest-check";
import { GuestCheck } from "./guest-check.entity";
import { GuestCheckService } from "./guest-check.service";

@Controller('guest-check')
export class GuestCheckController {

    constructor(
        private readonly guestCheckService: GuestCheckService
    ){}

    @Post()
    create(
        @Body()
        dto: CreateGuestCheckDto
    ): Promise<GuestCheck> {
        return this.guestCheckService.create(dto);
    }

    @Patch(':id')
    close(
        @Param('id', ParseUUIDPipe)
        id: string,
        @Body()
        dto: UpdateGuestCheckDto
    ): Promise<GuestCheck> {
        return this.guestCheckService.close(id);
    }

}