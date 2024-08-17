import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Seed users
    const user1 = await prisma.user.create({
        data: {
            email: 'sipecantingadmin@gmail.com',
            password: await bcrypt.hash("password", 10),
        },
    });
    await prisma.userDetail.create({
        data: {
            userId: user1.id,
            fullName: "Si Pecanting Admin",
            shortName: "Si Pecanting Admin",
            age: 24,
            phoneNumber: "123456789"
        },
    });
    // Seed posts
    await prisma.article.createMany({
        data: [
            {
                title: 'First Post',
                content: 'This is my first post',
                authorId: user1.id,
            },
            {
                title: 'Second Post',
                content: 'This is my second post',
                authorId: user1.id,
            },
        ],
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
