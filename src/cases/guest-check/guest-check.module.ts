import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GuestCheckController } from "./guest-check.controller";
import { GuestCheck } from "./guest-check.entity";
import { GuestCheckService } from "./guest-check.service";

@Module({
    imports    : [TypeOrmModule.forFeature([GuestCheck])],
    controllers: [GuestCheckController],
    providers  : [GuestCheckService],
})
export class GuestCheckModule {}