import { extendType, objectType, nonNull, stringArg  } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";  


export const Quiz = objectType({
    name: "Quiz", 
    definition(t) {  
        t.nonNull.int("id"); 
        t.nonNull.string("title");
        t.nonNull.string("questions"); 
        t.nonNull.string("answers"); 

    },
});


export const QuizQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("quiz", {   // 3
            type: "Quiz",
            resolve(parent, args, context, info) {    // 4
                return  context.prisma.quiz.findMany();
            },
        });
    },
});


export const QuizMutation = extendType({  // 1
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("post", {  // 2
            type: "Quiz",  
            args: {   // 3
                title: nonNull(stringArg()),
                questions: nonNull(stringArg()),
                answers: nonNull(stringArg())
            
            },
            
            resolve(parent, args, context) {    
                const {title, questions, answers} = args;
                
                const newQuiz = context.prisma.quiz.create({
                    data:    {
                        title: args.title,
                        questions: args.questions,
                        answers: args.answers
                    }
                })
                return newQuiz;
            },
        });
    },
});