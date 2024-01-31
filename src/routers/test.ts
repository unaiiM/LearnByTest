import { Router, Request, Response } from "express";
import TestsService, { QuestionDto, TestDto } from "../services/tests.js";

interface QuestionDeletion {
    index : number;
};

export const router = Router();

router.route("/:oid")
    .get((req : Request, res : Response) => {
        const oid : string = req.params.oid;
        res.json(TestsService.getTestResults(oid));
    })
    .delete((req : Request, res : Response) => {
        const oid : string = req.params.oid;
        TestsService.deleteTest(oid)
            .then(() => {
                res.status(200).send();
            });
    });

router.route("/:oid/questions")
    .get((req : Request, res : Response) => {
        const oid : string = req.params.oid;
        res.json(TestsService.getQuestions(oid));
    })
    .post((req : Request, res : Response) => {
        const oid : string = req.params.oid;
        const body : QuestionDto = req.body;
        TestsService.addQuestion(oid, body)
            .then(() => {
                res.status(200).send();
            });
    })
    .delete((req : Request, res : Response) => {
        const oid : string = req.params.oid;
        const body : QuestionDeletion = req.body;
        TestsService.removeQuestion(oid, body.index)
            .then(() => {
                res.status(200).send();
            });
    });

router.route("/:oid/finish")
    .post((req : Request, res : Response) => {
        const oid : string = req.params.oid;
        const body : boolean[] = req.body;
        TestsService.finishTest(oid, body)
        .then(() => {
            res.status(200).send();
        });
    });