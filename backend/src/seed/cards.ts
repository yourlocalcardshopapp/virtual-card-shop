import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleCards = [
  {
    name: 'Fire Dragon',
    description: 'A mighty dragon with control over flames',
    rarity: 'rare',
    imageUrl: 'https://via.placeholder.com/300x400?text=Fire+Dragon',
  },
  {
    name: 'Ice Wizard',
    description: 'Master of frost and winter magic',
    rarity: 'rare',
    imageUrl: 'https://via.placeholder.com/300x400?text=Ice+Wizard',
  },
  {
    name: 'Forest Elf',
    description: 'Guardian of the ancient forests',
    rarity: 'uncommon',
    imageUrl: 'https://via.placeholder.com/300x400?text=Forest+Elf',
  },
  {
    name: 'Shadow Knight',
    description: 'A warrior shrouded in darkness',
    rarity: 'rare',
    imageUrl: 'https://via.placeholder.com/300x400?text=Shadow+Knight',
  },
  {
    name: 'Crystal Golem',
    description: 'An elemental construct of pure crystal',
    rarity: 'uncommon',
    imageUrl: 'https://via.placeholder.com/300x400?text=Crystal+Golem',
  },
  {
    name: 'Thunder Mage',
    description: 'Harnesses the power of lightning',
    rarity: 'common',
    imageUrl: 'https://via.placeholder.com/300x400?text=Thunder+Mage',
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Create or find a test user
    const user = await prisma.user.upsert({
      where: { email: 'test@cardshop.com' },
      update: {},
      create: {
        email: 'test@cardshop.com',
        username: 'testuser',
        password: 'hashed_password_placeholder', // In production, use actual hashing
      },
    });

    console.log(`👤 User created/found: ${user.username}`);

    // Create sample cards
    for (const cardData of sampleCards) {
      const card = await prisma.card.create({
        data: {
          ...cardData,
          userId: user.id,
        },
      });
      console.log(`✅ Card created: ${card.name}`);
    }

    console.log('✨ Database seed completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
