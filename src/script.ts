// 1
import { PrismaClient } from "@prisma/client";

// 2
const prisma = new PrismaClient();

// 3
async function main() {
    const newQuiz = await prisma.quiz.create({
        data:    {
            title: "English",
            questions: "Fullstack tutorial for GraphQL",
            answers: "a lot of them"
        }
    })
    const allQuizes = await prisma.quiz.findMany();
    console.log(allQuizes)
}

// 4
main()
    .catch((e) => {
        throw e;
    })
    // 5
    .finally(async () => {
        await prisma.$disconnect();
    });