import express from 'express';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const course = await req.db.getCourseById(Number(id));
        const articles = await req.db.getArticlesByCourseId(Number(id));
        res.json({ course, articles });
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
    if (!req.body.categoryId || !req.body.name) {
        res.sendStatus(400);
        return;
    }
    try {
        await req.db.addCourse(Number(req.body.categoryId), req.body.name);
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
    if (!req.body.name) {
        res.sendStatus(400);
        return;
    }
    try {
        await req.db.updateCourse(Number(req.params.id), req.body.name);
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
        await req.db.deleteCourse(Number(req.params.id));
        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
});

export default router;