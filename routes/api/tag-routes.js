const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

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
  // find all tags
  // be sure to include its associated Product data
});

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
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((dbTagData) => res.status(200).json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }); 
  // create a new tag
});

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
  // update a tag's name by its `id` value
});

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
  // delete on tag by its `id` value
});

module.exports = router;
