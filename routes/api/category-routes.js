const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// This function is a GET route that returns all categories
router.get("/", (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => res.status(200).json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error finding categories." });
    });
});

// This function is a GET route that returns a single category by id
router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  }).then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    res.status(200).json(dbCategoryData);
  });
});

// This function is a POST route that creates a new category
router.post("/", (req, res) => {
  Category.create(req.body)
    .then((dbCategoryData) => res.status(200).json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error creating category." });
    });
});

// This function is a PUT route that updates a category by id
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    res.status(200).json({ message: "Category updated."});
  });
});

// This function is a DELETE route that deletes a category by id
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    res.status(200).json({ message: "Category deleted."});
  });
});

module.exports = router;
