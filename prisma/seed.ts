import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('password123', 10)

    // Create Users
    const admin = await prisma.user.upsert({
        where: { email: 'admin@crirs.com' },
        update: {},
        create: {
            email: 'admin@crirs.com',
            name: 'System Admin',
            password,
            role: 'ADMIN',
            profile: {
                create: {
                    address: 'City Hall',
                    phone: '555-0100'
                }
            }
        },
    })

    const leader = await prisma.user.upsert({
        where: { email: 'leader@crirs.com' },
        update: {},
        create: {
            email: 'leader@crirs.com',
            name: 'Community Leader',
            password,
            role: 'LEADER',
            profile: {
                create: {
                    address: 'Community Center',
                    phone: '555-0101'
                }
            }
        },
    })

    const member = await prisma.user.upsert({
        where: { email: 'member@crirs.com' },
        update: {},
        create: {
            email: 'member@crirs.com',
            name: 'Jane Doe',
            password,
            role: 'MEMBER',
            profile: {
                create: {
                    address: '123 Maple St',
                    phone: '555-0102'
                }
            }
        },
    })

    // Create Issues
    await prisma.issue.createMany({
        data: [
            {
                title: 'Broken Streetlight',
                description: 'Streetlight on corner of Main and 1st is flickering.',
                category: 'ELECTRICITY',
                priority: 'MEDIUM',
                status: 'PENDING',
                reportedById: member.id,
                location: 'Main St & 1st Ave'
            },
            {
                title: 'Pothole on 5th',
                description: 'Large pothole damaging cars.',
                category: 'ROAD',
                priority: 'HIGH',
                status: 'IN_PROGRESS',
                reportedById: member.id,
                location: '5th Ave',
                assignedToId: leader.id
            },
            {
                title: 'Water Leak',
                description: 'Pipe burst near park entrance.',
                category: 'WATER',
                priority: 'URGENT',
                status: 'RESOLVED',
                reportedById: admin.id,
                location: 'Central Park',
                assignedToId: leader.id,
                resolvedAt: new Date()
            }
        ]
    })

    // Create Transactions
    await prisma.transaction.createMany({
        data: [
            {
                type: 'INCOME',
                category: 'DONATION',
                amount: 5000,
                description: 'Annual Community Grant',
                createdById: admin.id
            },
            {
                type: 'INCOME',
                category: 'DONATION',
                amount: 15000,
                description: 'State Infrastructure Grant',
                createdById: admin.id
            },
            {
                type: 'EXPENSE',
                category: 'REPAIR',
                amount: 1200,
                description: 'Water Pipe Fix Materials',
                createdById: leader.id
            },
            {
                type: 'EXPENSE',
                category: 'LABOR',
                amount: 800,
                description: 'Contractor fees for pothole',
                createdById: leader.id
            }
        ]
    })

    // Create Announcements
    await prisma.announcement.createMany({
        data: [
            {
                title: 'Community Grant Approved',
                content: 'We are pleased to announce that the state has approved our infrastructure grant application for $15,000. This will go towards road repairs and park lighting.',
                authorId: leader.id
            },
            {
                title: 'Town Hall Meeting',
                content: 'Join us next Tuesday at 6 PM for a town hall meeting to discuss the new sanitation schedule.',
                authorId: admin.id
            },
            {
                title: 'Volunteers Needed',
                content: 'We need volunteers for the upcoming weekend cleanup drive at Central Park.',
                authorId: leader.id
            }
        ]
    })

    console.log({ admin, leader, member })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
