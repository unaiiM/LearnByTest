import Database, { Test, Tests, Question } from "../db/index.js";

export interface TestDto {
    oid : string;
    name : string;
    description : string;
};

export interface QuestionDto {
    question : string;
    answer : string;
};

export interface TestResultsDto {
    times : number;
    questions : QuestionResultsDto[];
};

export interface QuestionResultsDto {
    question : string;
    good : number;
    bad : number;
};

export default class TestsService {

    private static generateUniqueId() {
        return Math.random().toString(36).substring(2) +
          (new Date()).getTime().toString(36);
    };

    public static getTests() : TestDto[] {
        const tests : Tests = Database.db.data.tests;
        let dto : TestDto[] = [];

        for(const oid in tests){
            const test : Test = tests[oid];
            dto.push({
                oid: oid,
                name: test.name,
                description: test.description,
            });
        };

        return dto;
    };

    public static async createTest(dto : TestDto) : Promise<void> {
        const oid : string = this.generateUniqueId();
        const test : Test = {
            times: 0,
            name: dto.name,
            description: dto.description,
            questions: [],
        };
        return await Database.db.update(({ tests }) => tests[oid] = test);
    };

    public static async deleteTest(oid : string) : Promise<void> {
        return await Database.db.update(({ tests }) => delete tests[oid]);
    };

    public static async addQuestion(oid : string, dto : QuestionDto) : Promise<void> {
        const question : Question = {
            question: dto.question,
            answer: dto.answer,
            good: 0,
            bad: 0,
        };
        return await Database.db.update(({ tests }) => tests[oid].questions.push(question));
    };

    public static async removeQuestion(oid : string, index : number) : Promise<void> {
        return await Database.db.update(({ tests }) => tests[oid].questions.splice(index, 1));
    };

    public static getQuestions(oid : string) : QuestionDto[] {
        const tests : Tests = Database.db.data.tests;
        const questions : Question[] = tests[oid].questions;
        let dto : QuestionDto[] = [];
        questions.forEach((question : Question) => { 
            dto.push({
                question: question.question,
                answer: question.answer,
            }); 
        });
        return dto;
    };

    public static async finishTest(oid : string, goods : boolean[]) : Promise<void> {
        return await Database.db.update(({ tests }) => {
            const test : Test = tests[oid];
            test.times++;
            const questions : Question[] = test.questions;
            if(goods.length < questions.length) return;
            
            for(let i : number = 0; i < questions.length; i++){
                const question : Question = questions[i];
                const good : boolean = goods[i];  
                if(good) question.good++;
                else question.bad++;
            };
        });
    };

    public static getTestResults(oid : string) : TestResultsDto {
        const test : Test = Database.db.data.tests[oid];
        let results : TestResultsDto = {
            times: test.times,
            questions: [],
        };
        test.questions.forEach((question : Question) => {
            results.questions.push({
                question: question.question,
                good: question.good,
                bad: question.bad,
            });
        });

        return results;
    };

};