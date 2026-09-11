import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuestCheckService } from '../guest-check/guest-check.service';
import { ProductService } from '../products/product.service';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-orders';
import { OrderItem } from './entities/order-item.entity';
import { Order, OrderStatus } from './entities/orders.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly guestCheckService: GuestCheckService,
    private readonly productService: ProductService,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  private async prepareItems(itemDto: CreateOrderItemDto): Promise<OrderItem> {
    const product = await this.productService.findOne(itemDto.productId);
    const subtotal = Number(product.price) * itemDto.quantity;

    return this.orderItemRepository.create({
      product,
      quantity: itemDto.quantity,
      subtotal,
    });
  }
  
  async create(dto: CreateOrderDto): Promise<Order> {
    const guestCheck = await this.guestCheckService.findOrCreateOpened(
      dto.spotId,
    );

    const items: OrderItem[] = [];
    let total = 0;

    for (const itemDto of dto.items) {
      const item = await this.prepareItems(itemDto);
      items.push(item);
      total += Number(item.subtotal);
    }

    const order = this.orderRepository.create({
      guestCheck,
      status: OrderStatus.NEW,
      total,
      items,
    });
    return this.orderRepository.save(order);
  }
}