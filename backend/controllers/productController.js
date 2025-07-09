const Producttable = require("../models/productModel");
const mongoose = require("mongoose");

const getProduct = async (req, res) => {
  try {
    const data = await Producttable.find();
    res.json(data);
  } catch (error) {
    res.send(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    console.log("Received subcategoryId:", subcategoryId);

    // Check if subcategoryId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
      console.error("Invalid ObjectId:", subcategoryId);
      return res.status(400).json({ message: "Invalid subcategory ID" });
    }

    const products = await Producttable.find({ subcategory: subcategoryId });

    // console.log("Fetched Products:", products);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const uploadProducts = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  // const imageUrl = `/uploads/${req.file.filename}`;
  const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
  const {
    // subcategory,
    //   productName,
    productCode,
    //   productType,
    //   fabricType,
    //   productSize,
    //   productColor,
    //   proMinQuantity,
    //   productPrice,
    //   productDescription,
    //   tags,
  } = req.body;

  // console.log("data from upload product file:", req.body);

  // Check if productCode already exists
  const existingProduct = await Producttable.findOne({ productCode });
  if (existingProduct) {
    return res.status(409).json({
      success: false,
      message: `Product code '${productCode}' already exists. Please use a unique product code.`,
    });
  }

  // const insertedProduct = new Producttable({
  //   productName,
  //   productCode,
  //   productType,
  //   fabricType,
  //   productSize,
  //   productColor,
  //   proMinQuantity,
  //   productPrice,
  //   tags,
  //   imageUrl: imageUrls,
  //   productDescription,
  //   subcategory: subcategory,
  // });
  const insertedProductdata = {
    productName: req.body.productName || "",
    productCode: req.body.productCode || "",
    productType: req.body.productType || "",
    fabricType: req.body.fabricType || "",
    productSize: req.body.productSize || "",
    productColor: req.body.productColor || "",
    proMinQuantity: req.body.proMinQuantity || "",
    productPric: req.body.productPric || "",
    tags: req.body.tags || "",
    materialType: req.body.materialType || "",
    capacity: req.body.capacity || "",
    imageUrl: imageUrls,
    productDescription: req.body.productDescription || "",
    subcategory: req.body.subcategory || "",
  };

  // Remove empty string or undefined fields
  Object.keys(insertedProductdata).forEach((key) => {
    if (
      insertedProductdata[key] === undefined ||
      insertedProductdata[key] === "" ||
      (Array.isArray(insertedProductdata[key]) &&
        insertedProductdata[key].length === 0)
    ) {
      delete insertedProductdata[key];
    }
  });

  const insertedProduct = new Producttable(insertedProductdata);
  await insertedProduct.save();

  res.status(200).json({ insertedProduct });
};

const sideImages = async (req, res) => {
  const { productId } = req.params;
  console.log("productId received:", productId);

  try {
    const product = await Producttable.findOne({ productId }).populate({
      path: "subcategory",
      select: "name category",
      populate: {
        path: "category",
        select: "name",
      },
    });

    if (!product) {
      console.log("No product found with that productId");
      return res
        .status(404)
        .json({ message: "No product found with that productId" });
    }

    console.log("Product found:", product);
    res.json(product); // ✅ Return the full product document
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const searchProduct = async (req, res) => {
  const query = req.query.query; // ✅ Correct way to get query string like ?query=tshirt
  console.log("Query from client:", req.query.query);

  if (!query) {
    return res.status(400).json({ message: "Missing keyword" }); // <- This is what you're seeing
  }

  const regex = new RegExp(query, "i");

  try {
    const results = await Producttable.find({
      $or: [{ productName: regex }, { tags: regex }],
    }).populate({
      path: "subcategory",
      select: "name category",
      populate: {
        path: "category",
        select: "name",
      },
    });

    res.json(results);
  } catch (err) {
    console.error("Error in searchProduct:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const uploadProductCSV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = path.join(
      __dirname,
      "../public/uploads",
      req.file.filename
    );

    const results = [];

    fs.createReadStream(filePath, { encoding: "utf8" })
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          const duplicateProductCodes = [];
          const failedProducts = [];
          let savedCount = 0;

          const Subcategory = require("../models/subCategoryModel");

          for (const item of results) {
            const productCode = item.productCode?.trim();
            if (!productCode) {
              failedProducts.push({ item, reason: "Missing productCode" });
              continue;
            }

            const existingProduct = await Producttable.findOne({ productCode });
            if (existingProduct) {
              duplicateProductCodes.push(productCode);
              failedProducts.push({
                item,
                reason: `Duplicate productCode: ${productCode}`,
              });
              continue;
            }

            const subcategory = await Subcategory.findOne({
              id: item.subcategory,
            });
            if (!subcategory) {
              failedProducts.push({
                item,
                reason: `Invalid subcategory id: ${item.subcategory}`,
              });
              continue;
            }

            const baseImagePath = "/uploads/images/";
            const imagePaths = item.imageUrl
              ? item.imageUrl
                  .split(";")
                  .map((img) => baseImagePath + encodeURIComponent(img.trim()))
              : [];

            const toNullable = (val) => (val?.trim() === "" ? undefined : val);

            const newProduct = new Producttable({
              productCode,
              productName: item.productName,
              productDescription: toNullable(item.productDescription),
              productType: toNullable(item.productType),
              proMinQuantity: parseInt(item.proMinQuantity) || undefined,
              fabricType: toNullable(item.fabricType),
              imageUrl: imagePaths,
              productSize: toNullable(item.productSize),
              productColor: toNullable(item.productColor),
              productPrice: parseFloat(item.productPrice) || undefined,
              tags: toNullable(item.tags),
              subcategory: subcategory._id,
              csvFileName: req.file.filename,
              capacity: toNullable(item.capacity),
            });

            try {
              await newProduct.save();
              savedCount++;
            } catch (err) {
              failedProducts.push({
                item,
                reason: `Database save error: ${err.message}`,
              });
            }
          }

          const responseMessage = {
            message:
              savedCount > 0
                ? `Products imported successfully. ${savedCount} saved, ${duplicateProductCodes.length} duplicate(s), ${failedProducts.length} failed.`
                : duplicateProductCodes.length === results.length
                ? `No products saved. All ${results.length} are duplicates.`
                : failedProducts.length === results.length
                ? `No products saved. All ${results.length} rows failed validation.`
                : `No products were saved.`,
          };

          if (duplicateProductCodes.length > 0) {
            responseMessage.duplicates = duplicateProductCodes;
          }

          if (failedProducts.length > 0) {
            responseMessage.failed = failedProducts;
          }

          res.status(savedCount > 0 ? 201 : 400).json(responseMessage);
        } catch (err) {
          console.error("Error during CSV processing:", err);
          res.status(500).json({ message: "Error saving products" });
        }
      });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error during file upload" });
  }
};

const updateProduct = async (req, res) => {
  let { productCode } = req.body;

  // console.log("Received productCode:", productCode);

  if (!productCode) {
    return res.status(400).json({ message: "productCode is required" });
  }

  productCode = productCode.trim(); // Remove whitespace

  try {
    // const product = await Producttable.findOne({ productCode });
    const product = await Producttable.findOne({
      productCode: productCode,
    }).populate({
      path: "subcategory",
      populate: { path: "category" },
    });

    // console.log("product fetched:", product);

    if (!product) {
      return res
        .status(404)
        .json({ message: "No product found for this productCode" });
    }

    res.status(200).json({ product, message: "Data fetched successfully" });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateProductWithProductCode = async (req, res) => {
  try {
    const { productCode } = req.body;
    console.log("productCode:", productCode);
    let existingImages = req.body.existingImages || [];
    console.log("existingImages", existingImages);
    // Normalize in case it's a string or comma-separated value
    if (typeof existingImages === "string") {
      try {
        existingImages = JSON.parse(existingImages); // If it's a JSON string like '["a.jpg", "b.jpg"]'
      } catch {
        existingImages = [existingImages]; // Single string case
      }
    }

    let updatedImageUrls;

    if (req.files && req.files.length > 0) {
      updatedImageUrls = req.files.map((file) => `/uploads/${file.filename}`);
    } else {
      updatedImageUrls = Array.isArray(existingImages)
        ? existingImages
        : [existingImages];
    }
    // Build the update object
    // const updateFields = {
    //   productName: req.body.productName || "",
    //   productType: req.body.productType || "",
    //   fabricType: req.body.fabricType || "",
    //   productSize: req.body.productSize || "",
    //   productColor: req.body.productColor || "",
    //   proMinQuantity: req.body.proMinQuantity ||"",
    //   // productPrice: req.body.productPrice || "",
    //   productDescription: req.body.productDescription || "",
    //   tags: req.body.tags || "",
    //   subcategory: req.body.selectedSubCategory || "",
    //   imageUrl: updatedImageUrls || "",
    // };
    const sanitize = (value) => {
      return value === undefined ||
        value === null ||
        value === "" ||
        value === "undefined"
        ? undefined
        : value;
    };

    const updateFields = {
      productName: sanitize(req.body.productName),
      productType: sanitize(req.body.productType),
      fabricType: sanitize(req.body.fabricType),
      productSize: sanitize(req.body.productSize),
      productColor: sanitize(req.body.productColor),
      proMinQuantity: sanitize(req.body.proMinQuantity),
      productDescription: sanitize(req.body.productDescription),
      tags: sanitize(req.body.tags),
      subcategory: sanitize(req.body.selectedSubCategory),
      imageUrl: updatedImageUrls,
    };

    // Only set productPrice if it's a valid number
    if (req.body.productPrice !== undefined && !isNaN(req.body.productPrice)) {
      updateFields.productPrice = Number(req.body.productPrice);
    }

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    // Remove empty string or undefined fields
    // Object.keys(updateFields).forEach((key) => {
    //   if (
    //     updateFields[key] === undefined ||
    //     updateFields[key] === "" ||
    //     (Array.isArray(updateFields[key]) && updateFields[key].length === 0)
    //   ) {
    //     delete updateFields[key];
    //   }
    // });
    // Perform the update
    const updatedProduct = await Producttable.findOneAndUpdate(
      { productCode },
      { $set: updateFields },
      { new: true }
    );
    console.log("updatedProduct", updatedProduct);
    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const relatedProduct = async (req, res) => {
  const { productId } = req.params;
  console.log("Product id", productId);

  const data = await Producttable.findOne(
    { productId: productId },
    { _id: 0, subcategory: 1 }
  );
  console.log("data", data);

  if (!data) {
    return res.status(404).json({ message: "Product not found" });
  }

  const relatedProducts = await Producttable.find({
    subcategory: data.subcategory,
    productId: { $ne: productId }, // exclude the current product
  });

  console.log("relatedProducts", relatedProducts);
  res.json(relatedProducts);
};

module.exports = {
  getProduct,
  getProductById,
  uploadProducts,
  sideImages,
  searchProduct,
  uploadProductCSV,
  updateProduct,
  updateProductWithProductCode,
  relatedProduct,
};
