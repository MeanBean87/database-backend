const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// This function is a GET route that returns all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((dbTagData) => res.status(200).json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// This function is a GET route that returns a single tag by id
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  }).then((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }
    res.status(200).json(dbTagData);
  });
});

// This function is a POST route that creates a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((dbTagData) => res.status(200).json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }); 
});

// This function is a PUT route that updates a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }
    res.status(200).json(dbTagData);
  });
});

// This function is a DELETE route that deletes on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }
    res.status(200).json(dbTagData);
  });
});

module.exports = router;
