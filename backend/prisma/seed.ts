import {
  Gender,
  Level,
  PrismaClient,
  Subway,
  Time,
  Type,
} from '@prisma/client';
import { generateHash } from '../src/shared/utils/hasher';
import { Role } from 'src/shared/types/role.enum';

const USERS_UUIDS = [
  '6d308040-96a2-4162-bea6-2338e9976540',
  '6d308040-96a2-4162-bea6-23asw5976540',
  '6d308040-hf6s-4162-bea6-2338e9976540',
  '6d336740-96a2-4162-bea6-23asw5976540',
  '6d30d530-hf6s-4162-bea6-2338e9976540',
];
const WORKOUTS_UUIDS = [
  '6d308040-hf6s-4162-bea6-2338e9sd2760',
  '6d336740-96a2-4162-bea6-23asw5976hd6',
  '6d3er530-hf6s-4162-bea6-23klye997650',
  '6d30d530-hf6s-4162-bea6-2nry6j997650',
  '6d30d530-hf6s-4162-hfy5-23klye997650',
];

function getUsers() {
  return [
    {
      id: USERS_UUIDS[0],
      name: 'Alina',
      email: 'test@test.ru',
      avatarUrl: 'img/content/user-photo-1.png',
      password: 'test123',
      gender: 'Female',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      subway: 'Pionerskaya',
      role: 'Customer',
    },
    {
      id: USERS_UUIDS[1],
      name: 'Elena',
      email: 'test1@test.ru',
      avatarUrl: 'img/content/user-photo-1.png',
      password: 'test123',
      gender: 'Female',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      subway: 'Petrogradskaya',
      role: 'Customer',
    },
    {
      id: USERS_UUIDS[2],
      name: 'Vladimir',
      email: 'test2@test.ru',
      avatarUrl: 'img/content/user-photo-2.png',
      password: 'test123',
      gender: 'Male',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      subway: 'Udelnaya',
      role: 'Customer',
    },
    {
      id: USERS_UUIDS[3],
      name: 'Oksana',
      email: 'test3@test.ru',
      avatarUrl: 'img/content/user-photo-1.png',
      password: 'test123',
      gender: 'Female',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      subway: 'Zvezdnaya',
      role: 'Customer',
    },
    {
      id: USERS_UUIDS[4],
      name: 'Ruslan',
      email: 'test4@test.ru',
      avatarUrl: 'img/content/user-photo-2.png',
      password: 'test123',
      gender: 'Male',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      subway: 'Sportivnaya',
      role: 'Customer',
    },
  ];
}

function getWorkouts() {
  return [
    {
      id: WORKOUTS_UUIDS[0],
      name: 'Тренировка 1',
      imageUrl: 'img/content/thumbnails/training-12.jpg',
      level: 'Beginner',
      type: 'Running',
      duration: 'Short',
      price: 1500,
      calories: 300,
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      gender: 'Female',
      videoUrl: 'img/content/training-video/video-thumbnail.png',
      coach: 'Nastya',
      isSpecial: false,
    },
    {
      id: WORKOUTS_UUIDS[1],
      name: 'Тренировка 2',
      imageUrl: 'img/content/thumbnails/training-12.jpg',
      level: 'Professional',
      type: 'Crossfit',
      duration: 'VeryLong',
      price: 3500,
      calories: 800,
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      gender: 'Male',
      videoUrl: 'img/content/training-video/video-thumbnail.png',
      coach: 'Alex',
      isSpecial: false,
    },
    {
      id: WORKOUTS_UUIDS[2],
      name: 'Тренировка 3',
      imageUrl: 'img/content/thumbnails/training-12.jpg',
      level: 'Amateur',
      type: 'Aerobics',
      duration: 'Medium',
      price: 2000,
      calories: 400,
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      gender: 'Female',
      videoUrl: 'img/content/training-video/video-thumbnail.png',
      coach: 'Nastya',
      isSpecial: true,
    },
    {
      id: WORKOUTS_UUIDS[3],
      name: 'Тренировка 2',
      imageUrl: 'img/content/thumbnails/training-12.jpg',
      level: 'Professional',
      type: 'Running',
      duration: 'VeryLong',
      price: 3500,
      calories: 1000,
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      gender: 'Male',
      videoUrl: 'img/content/training-video/video-thumbnail.png',
      coach: 'Nikita',
      isSpecial: true,
    },
    {
      id: WORKOUTS_UUIDS[4],
      name: 'Тренировка 3',
      imageUrl: 'img/content/thumbnails/training-12.jpg',
      level: 'Amateur',
      type: 'Boxing',
      duration: 'Medium',
      price: 2000,
      calories: 400,
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      gender: 'Female',
      videoUrl: 'img/content/training-video/video-thumbnail.png',
      coach: 'Olya',
      isSpecial: true,
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockUsers = getUsers();
  for (const user of mockUsers) {
    await prismaClient.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: user.id,
        description: user.description,
        email: user.email,
        gender: user.gender as Gender,
        imageUrl: user.avatarUrl,
        avatarUrl: user.avatarUrl,
        name: user.name,
        subway: user.subway as Subway,
        passwordHash: await generateHash(user.password),
        role: user.role as Role,
      },
    });
  }
  const mockWorkouts = getWorkouts();
  for (const workout of mockWorkouts) {
    await prismaClient.workout.upsert({
      where: { id: workout.id },
      update: {},
      create: {
        id: workout.id,
        calories: workout.calories,
        coach: workout.coach,
        description: workout.description,
        duration: workout.duration as Time,
        gender: workout.gender as Gender,
        imageUrl: workout.imageUrl,
        isSpecial: workout.isSpecial,
        level: workout.level as Level,
        name: workout.name,
        price: workout.price,
        type: workout.type as Type,
        videoUrl: workout.videoUrl,
        coachId: '6d308040-96a2-4162-bea6-23asw5976540',
      },
    });
  }
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
