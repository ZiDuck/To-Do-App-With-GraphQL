import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskInput): Promise<Task> {
    const result = await this.prisma.task.create({
      data,
    });

    return result;
  }

  async findAll(collectionId: number): Promise<Task[]> {
    const result = await this.prisma.task.findMany({
      where: {
        collectionId,
      },
    });
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.task.findUnique({
      where: {
        id
      }
    })
    
    return result;
  }

  async update (data: UpdateTaskInput): Promise<Task> {
    const { id, ...dataUpdate } = data;

    const result = await this.prisma.task.update({
      where: {
        id
      },
      data
    })
    return result;
  }

  async delete(id: number): Promise<Task> {
    const result = await this.prisma.task.delete({
      where: {
        id
      }
    })
    
    return result; 
  }
}
