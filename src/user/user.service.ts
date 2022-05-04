import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users;
    }

    async findOneByEmail(email: string): Promise<User> {
        const result = await this.prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                collections: {
                    include: {
                        tasks: true,
                    },
                },
            },
        });

        if (!result) throw new BadRequestException('User not found!');
        return result;
    }

    async findOne(id: number): Promise<User> {
        const result = await this.prisma.user.findUnique({
            where: {
                id
            }
        })
        
        return result
    }

    async create(data: CreateUserInput): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            }
        })

        if(user) throw new BadRequestException('Email already exists!');

        const hashedPassword: string = await bcrypt.hash(data.passWord, 10);
        data.passWord = hashedPassword;

        const result = await this.prisma.user.create({
            data,
        })
        return result;
    }

    async update(data: UpdateUserInput, id: number): Promise<User> {
        const hashedPassword: string = await bcrypt.hash(data.passWord, 10);
        data.passWord = hashedPassword;
        const result = await this.prisma.user.update({
            where: {
                id
            },
            data
        })
        return result;
    }
}
