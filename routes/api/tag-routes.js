const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// finds all tags
router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find tag by id
router.get('/:id', async (req, res) => {
  try {
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{model: Product}]
  });
  if (!tagData) {
    res.status(404).json({message: 'No tag found with that id!'});
    return;
  }
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates new tag
router.post('/', async (req, res) => {
  try {
    const newTagData = await Tag.create(req.body);
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update tag name by id
router.put('/:id', async (req, res) => {
  try {
    const updatedTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedTagData) {
      res.status(404).json({message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json({updatedTagData, message: 'Tag updated!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete tag by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTagData) {
      res.status(404).json({message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json({deletedTagData, message: 'Tag deleted!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
