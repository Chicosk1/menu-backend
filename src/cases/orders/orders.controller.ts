import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-orders";
import { Order } from "./entities/orders.entity";
import { OrderService } from "./orders.service";

@Controller('orders')
export class OrderController {

    constructor(
        private readonly orderService: OrderService
    ){}

    @Post()
    create(
        @Body()
        dto: CreateOrderDto
    ): Promise<Order> {
        return this.orderService.create(dto);
    }

}