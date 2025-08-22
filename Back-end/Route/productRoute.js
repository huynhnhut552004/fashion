const express = require("express");
const router= express.Router();
const {authMiddleware, requireAdmin}= require("../Middleware/authMiddleware");
const Controller= require("../Controller/productController");

router.get("/Menproduct" ,Controller.getproductmen);
router.get("/Womenproduct",Controller.getproductwomen); 
router.get("/search", Controller.searchProducts);
router.get("/searchMen", Controller.searchProductMen);
router.get("/searchWomen", Controller.searchProductWomen);
router.get("/:id", Controller.getProductbyId);
router.get("/category/:categoryId/gender/:gender", Controller.getByCategorygender);
router.get("/category/:categoryId", Controller.getByCategory)
router.get("/", Controller.get);
router.post("/", Controller.post);
router.patch("/:id", authMiddleware, requireAdmin, Controller.patch);
router.delete("/:id", authMiddleware, requireAdmin, Controller.delete);
module.exports= router;