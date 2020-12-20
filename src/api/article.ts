import express from 'express';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const article = await req.db.getArticleById(Number(id));
        res.json({ article });
    } catch {
        res.statusCode = 400;
        res.json({ "message": "Couldn't find a course with matching id!" });
    }
});

router.post('/', async (req, res) => {
    if (req.user === null) {
        res.sendStatus(401);
        return;
    }
    if (!req.body.courseId || !req.body.name || !req.body.contents) {
        res.sendStatus(400);
        return;
    }
    try {
        await req.db.addArticle(Number(req.body.courseId), req.body.name, req.body.contents);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    if (req.user === null) {
        res.sendStatus(401);
        return;
    }
    if (!req.body.name || !req.body.contents) {
        res.sendStatus(400);
        return;
    }
    try {
        await req.db.updateArticle(Number(req.params.id), req.body.name, req.body.contents);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    if (req.user === null) {
        res.sendStatus(401);
        return;
    }
    try {
        await req.db.deleteArticle(Number(req.params.id));
        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
});

export default router;