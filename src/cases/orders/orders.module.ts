import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Spot } from "../spots/spot.entity";
import { Order } from "./entities/orders.entity";
import { OrderController } from "./orders.controller";
import { OrderService } from "./orders.service";

@Module({
    imports    : [TypeOrmModule.forFeature([Spot, Order])],
    controllers: [OrderController],
    providers  : [OrderService],
})
export class OrdersModule {}