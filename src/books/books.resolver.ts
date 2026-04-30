import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [Book], {
    name: 'getBooks',
    description: 'Obtiene la lista de todos los libros',
  })
  async findAll(
    @Args('available', { type: () => Boolean, nullable: true })
    available?: boolean,
  ) {
    return this.booksService.findAll(available);
  }

  @Mutation(() => Book, {
    name: 'createBook',
    description: 'Crea un nuevo libro en el catálogo',
  })
  async createBook(@Args('data') data: CreateBookInput) {
    return this.booksService.create(data);
  }

  @Mutation(() => Book, {
    name: 'updateBookAvailability',
    description: 'Actualiza la disponibilidad de un libro',
  })
  async updateBookAvailability(
    @Args('id', { type: () => Int }) id: number,
    @Args('isAvailable', { type: () => Boolean }) isAvailable: boolean,
  ) {
    return this.booksService.updateAvailability(id, isAvailable);
  }

  @Mutation(() => Book, {
    name: 'removeBook',
    description: 'Elimina un libro del catálogo',
  })
  async removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.remove(id);
  }

  @Mutation(() => Book, {
    name: 'dataUpdateBook',
    description: 'Actualiza los datos de un libro',
  })
  async updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateBookInput,
  ) {
    return this.booksService.update(id, data);
  }
}
