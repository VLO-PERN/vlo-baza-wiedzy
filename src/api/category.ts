import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await req.db.getAllCategories();
        res.json({ categories });
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const category = await req.db.getCategoryById(Number(id));
        const courses = await req.db.getCoursesByCategoryId(Number(id));
        res.json({ category, courses });
    } catch {
        res.statusCode = 400;
        res.json({ "message": "Couldn't find a category with matching id!" });
    }
});

router.post('/', async (req, res) => {
    if (req.user === null) {
        res.sendStatus(401);
        return;
    }
    if (!req.body.name || !req.body.pictureUrl) {
        res.sendStatus(400);
        return;
    }
    try {
        await req.db.addCategory(req.body.name, req.body.pictureUrl)
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
    if (!req.body.name || !req.body.pictureUrl) {
        res.sendStatus(400);
        return;
    }
    try {
        await req.db.updateCategory(Number(req.params.id), req.body.name, req.body.pictureUrl)
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
        await req.db.deleteCategory(Number(req.params.id));
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default router;