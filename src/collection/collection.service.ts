import { Injectable } from '@nestjs/common';
import { Collection } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCollectionInput, userId: number): Promise<Collection> {
    const result = await this.prisma.collection.create({
      data: {
        ...data,
        userId,
      },
    });
    return result;
  }

  async findAll(userId: number): Promise<Collection[]> {
    const result = await this.prisma.collection.findMany({
      where: { userId },
    });
    return result;
  }

  async findOne(id: number): Promise<Collection> {
    const result = await this.prisma.collection.findUnique({
      where: { id },
    });
    return result;
  }

  async update(id: number, data: UpdateCollectionInput): Promise<Collection> {
    const result = await this.prisma.collection.update({
      where: { id },
      data,
    });

    return result;
  }

  async delete(id: number): Promise<Collection> {
    const result = await this.prisma.collection.delete({
      where: { id },
    });
    return result;
  }
}
