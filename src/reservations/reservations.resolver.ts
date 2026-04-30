import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation } from './reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { GraphQLISODateTime } from '@nestjs/graphql';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => Reservation, { name: 'createReservation' })
  createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ) {
    return this.reservationsService.create(createReservationInput);
  }

  @Query(() => [Reservation], { name: 'getReservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Mutation(() => Reservation, { name: 'returnBook' })
  returnBook(
    @Args('reservationId', { type: () => Int }) reservationId: number,
  ) {
    return this.reservationsService.returnBook(reservationId);
  }

  @Query(() => [Reservation], { name: 'reservationsByUser' })
  async findByUser(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('startDate', { type: () => GraphQLISODateTime, nullable: true })
    startDate?: Date,
    @Args('endDate', { type: () => GraphQLISODateTime, nullable: true })
    endDate?: Date,
  ) {
    return this.reservationsService.findByUser(userId, startDate, endDate);
  }

  @Query(() => [Reservation], { name: 'reservationsByBook' })
  async findByBook(
    @Args('bookId', { type: () => Int }) bookId: number,
    @Args('startDate', { type: () => GraphQLISODateTime, nullable: true })
    startDate?: Date,
    @Args('endDate', { type: () => GraphQLISODateTime, nullable: true })
    endDate?: Date,
  ) {
    return this.reservationsService.findByBook(bookId, startDate, endDate);
  }
}
