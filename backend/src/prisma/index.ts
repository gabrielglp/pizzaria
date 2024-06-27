import { PrismaClient } from '@prisma/client';
require('dotenv').config();

const prismaClient = new PrismaClient();

export default prismaClient;