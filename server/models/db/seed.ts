import db from './db';
import { users, questions } from './schema';

(async () => {
  const [avery] = await db
    .insert(users)
    .values({ username: 'avery', password: 'password' })
    .returning();
  const [walter] = await db

    .insert(users)
    .values({ username: 'walter', password: 'password' })
    .returning();

  const [white] = await db
    .insert(users)
    .values({ username: 'white', password: 'password' })
    .returning();

  const [admin] = await db
    .insert(users)
    .values({ username: 'admin', password: 'password' })
    .returning();

  const [tagWebdev] = await db
    .insert(tags)
    .values({
      name: 'webdev',
      description: 'Website development',
    })
    .returning();

  const [tagAssembly] = await db
    .insert(tags)
    .values({
      name: 'assembly',
      description: 'x86 assembly',
    })
    .returning();

  const [tagDiamond] = await db
    .insert(tags)
    .values({
      name: 'diamonds',
      description: 'Blue diamonds',
    })
    .returning();

  const [walterQ1] = await db.insert(questions).values({
    title: 'How do I create blue diamonds?',
    text: 'I am unsure how to proceed',
    askerId: walter.id,
    viewCount: 0,
  });
  // TODO tags for walterQ1

  const [averyQ2] = await db
    .insert(questions)
    .values({
      title: 'What is React?',
      text: 'I must learn',
      askerId: avery.id,
      viewCount: 0,
    })
    .returning();

  const [whiteA1] = await db
    .insert(answers)
    .values({
      text: "Zuck's gift to the world",
      questionId: averyQ2.id,
      answererId: avery.id,
    })
    .returning();
})();
