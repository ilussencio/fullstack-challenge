import { Router } from "express";
import { getExample, postExample } from "../controllers/example.controller";

const router = Router();

router.get("/example", getExample);
router.post("/example", postExample);

export default router;
