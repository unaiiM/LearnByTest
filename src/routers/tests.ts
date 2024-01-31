import { Router, Request, Response } from "express";
import TestsService, { TestDto } from "../services/tests.js";

export const router = Router();

router.route("/")
    .get((req : Request, res : Response) => {
        res.json(TestsService.getTests());
    })
    .post((req : Request, res : Response) => {
        const body : TestDto = req.body;
        TestsService.createTest(body)
            .then(() => {
                res.status(200).send();
            });
    });