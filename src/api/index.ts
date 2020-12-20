import express from 'express';
import login from './login';
import category from './category';
import course from './course';
import article from './article';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Baza wiedzy VLO - API v1 🌎🌍🌏'
  });
});

router.use('/login', login);
router.use('/category', category);
router.use('/course', course);
router.use('/article', article);

export default router;