import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { backendEndApi, backendEndApiBannerUpload } from "../endUserApi/api";
import "../styles/UploadProducts.css"; // Custom styles here
import toast from "react-hot-toast";

const UploadProducts = () => {
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [productCode, setProductCode] = useState("");
  const [showUpload, setShowUpload] = useState(true);

  const [product, setProduct] = useState([]);
  const [formData, setFormData] = useState({
    selectedCategory: "",
    selectedSubCategory: "",
    productName: "",
    imageUrl: [],
    existingImages: [], // URLs from backend
    productCode: "",
    productType: "",
    fabricType: "",
    productSize: "",
    productColor: "",
    proMinQuantity: "",
    productPrice: "",
    productDescription: "",
    tags: "",
    materialType: "",
    capacity: "",
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get(`${backendEndApi}/category`);
      setCategory(res.data);
    };
    getCategory();
  }, []);

  console.log("category---", category);

  useEffect(() => {
    const getSubCategory = async () => {
      if (formData.selectedCategory) {
        const res = await axios.get(
          `${backendEndApi}/subcategories/${formData.selectedCategory}`
        );
        setSubCategory(res.data);
      }
    };
    getSubCategory();

    console.log("formData.selectedCategory", formData.selectedCategory);
  }, [formData.selectedCategory]);
  console.log("res.data", subcategory);
  console.log("formData.selectedCategory", formData.selectedCategory);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/png", "image/jpeg"];
    const maxFileSize = 100 * 1024; // 100KB

    const validFiles = [];

    let checked = 0;
    let allChecked = files.length;

    files.forEach((file) => {
      const isValidType = allowedTypes.includes(file.type);
      const isValidSize = file.size <= maxFileSize;

      if (!isValidType || !isValidSize) {
        checked++;
        return;
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width === 500 && img.height === 500) {
          validFiles.push(file);
        }
        checked++;

        if (checked === allChecked) {
          if (validFiles.length === 0) {
            alert("Only 500x500 PNG or JPEG images under 500KB are allowed.");
            e.target.value = "";
          } else {
            setFormData((prevData) => {
              const existingNames = prevData.imageUrl.map((f) => f.name);
              const newFiles = validFiles.filter(
                (f) => !existingNames.includes(f.name)
              );
              return {
                ...prevData,
                imageUrl: [...prevData.imageUrl, ...newFiles],
              };
            });
          }
        }
      };
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append text fields
    for (const key in formData) {
      if (key !== "imageUrl") {
        data.append(key, formData[key]);
      }
    }

    // Append multiple images
    formData.imageUrl.forEach((file) => {
      data.append("imageUrl", file); // Must match backend field name
    });
    if (!formData.imageUrl || formData.imageUrl.length === 0) {
      alert("Please select at least one image to upload");
      return;
    }
    data.append("subcategory", formData.selectedSubCategory);
    try {
      const response = await axios.post(
        `${backendEndApi}/products/upload/products`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("product upload response: ", response);
      alert("Product image uploaded successfully!");
      setFormData({
        selectedCategory: "",
        selectedSubCategory: "",
        productName: "",
        imageUrl: [],
        productCode: "",
        productType: "",
        fabricType: "",
        productSize: "",
        productColor: "",
        proMinQuantity: "",
        productPrice: "",
        productDescription: "",
        tags: "",
      });
      fileInputRef.current.value = ""; // ✅ clear the file input visually
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 409) {
          // Duplicate product code error from server
          alert(error.response.data.message || "Product code already exists!");
        } else {
          alert(
            "Error uploading product: " +
              (error.response.data.message || "Server error")
          );
        }
      } else {
        alert("Network error: Please check your internet connection.");
      }
    }
  };

  //   const searchProduct = async () => {
  //     try {
  //       const res = await axios.post(
  //         `${backendEndApi}/products/updateProduct`,
  //         {productCode:productCode},
  //         { headers: { "Content-Type": "application/json" }, withCredentials: true }
  //       );
  //       console.log("update res", res.data.product.subcategory.category);
  //       setProduct(res.data.product)
  //       setShowUpload(false);
  //       toast.success(res.data.message);
  //     } catch (error) {
  //       if (error.response?.data?.message) {
  //         toast.error(error.response.data.message);
  //       } else {
  //         toast.error("fetched failed. Please try again.");
  //       }
  //     }

  // //  console.log("product::::",product.subcategory.category.name)
  // //   console.log("product::::",product.subcategory.name)

  //   };

  // const handleUpdated = () => {};

  const searchProduct = async () => {
    try {
      const res = await axios.post(
        `${backendEndApi}/products/updateProduct`,
        { productCode },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const fetchedProduct = res.data.product;
      console.log("fetchedProduct", fetchedProduct);

      // Set both product (if needed) and form data
      setProduct(fetchedProduct);

      setFormData({
        selectedCategory: fetchedProduct.subcategory.category._id,
        selectedSubCategory: fetchedProduct.subcategory._id,
        productName: fetchedProduct.productName,
        productCode: fetchedProduct.productCode,
        productType: fetchedProduct.productType,
        fabricType: fetchedProduct.fabricType,
        productSize: fetchedProduct.productSize,
        productColor: fetchedProduct.productColor,
        proMinQuantity: fetchedProduct.proMinQuantity,
        productPrice: fetchedProduct.productPrice,
        productDescription: fetchedProduct.productDescription,
        tags: fetchedProduct.tags,
        materialType: fetchedProduct.materialType,
        capacity: fetchedProduct.capacity,
        imageUrl: [], // reset for new uploads
        existingImages: fetchedProduct.imageUrl || [], // store URLs
      });

      setShowUpload(false);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("fetched failed. Please try again.");
      }
      console.error("fetched error", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      if (key !== "imageUrl") {
        data.append(key, formData[key]);
      }
    }

    // Append images if any
    formData.imageUrl.forEach((file) => {
      data.append("imageUrl", file); // Only new files
    });

Object.keys(formData).forEach(key => {
  if (formData[key] === undefined || formData[key] === "undefined" || formData[key] === "") {
    delete formData[key];
  }
});

    
    try {
      const res = await axios.put(
        `${backendEndApi}/products/updateData`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setShowUpload(true);
      setFormData({
        selectedCategory: "",
        selectedSubCategory: "",
        productName: "",
        imageUrl: [],
        existingImages: [], // URLs from backend
        productCode: "",
        productType: "",
        fabricType: "",
        productSize: "",
        productColor: "",
        proMinQuantity: "",
        productPrice: "",
        productDescription: "",
        tags: "",
      });
      fileInputRef.current.value = ""; // ✅ clear the file input
      console.log("put res:", res);
      toast.success(res.data.message);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("update failed. Please try again.");
      }
      console.error("update error", error);
    }
  };
  // console.log("product::::", product.subcategory?.category?.name);

  // console.log("product::::",product)
  return (
    <>
      <div className="upload-form">
        <div className="form-group">
          <input
            type="text"
            name="productCode"
            value={productCode}
            placeholder="enter product code to search"
            onChange={(e) => {
              setProductCode(e.target.value);
            }}
          />
        </div>

        {/* <button onClick={searchProduct}>Search Product</button> */}
        <div className="form-group">
          <button type="submit" onClick={searchProduct}>
            Search Product
          </button>
        </div>
      </div>

      {showUpload ? (
        <form className="upload-form" onSubmit={handleUpload}>
          <div className="form-group">
            <label>
              Product Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Product Code<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="productCode"
              placeholder="Enter product code"
              value={formData.productCode}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Category<span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="selectedCategory"
              value={formData.selectedCategory}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            >
              <option value="">Choose Category</option>
              {category.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              Subcategory<span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="selectedSubCategory"
              value={formData.selectedSubCategory}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            >
              <option value="">Choose Subcategory</option>
              {subcategory.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              Product Type <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="productType"
              placeholder="Product Type"
              value={formData.productType}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          {/* <div className="form-group">
            <label>
              {formData.selectedCategory === "67dd46e9ad2dfed36bb7437c" ||
              formData.selectedCategory === "67dd46e9ad2dfed36bb7437f"
                ? "Fabric Type"
                : "Material Type"}
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="fabricType"
              placeholder={
                formData.selectedCategory === "67dd46e9ad2dfed36bb7437c" ||
                formData.selectedCategory === "67dd46e9ad2dfed36bb7437f"
                  ? "Fabric Type"
                  : "Material Type"
              }
              value={formData.fabricType}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div> */}
          <div className="form-group">
            <label>
              Fabric Type
            </label>
            <input
              type="text"
              name="fabricType"
              placeholder="Size"
              value={formData.fabricType}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Capacity
            </label>
            <input
              type="text"
              name="capacity"
              placeholder="Size"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>
              Material Type
            </label>
            <input
              type="text"
              name="materialType"
              placeholder="Size"
              value={formData.materialType}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>
              Product Size
            </label>
            <input
              type="text"
              name="productSize"
              placeholder="Size"
              value={formData.productSize}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Product Color
            </label>
            <input
              type="text"
              name="productColor"
              placeholder="Color"
              value={formData.productColor}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Minimum Quantity
            </label>
            <input
              type="text"
              name="proMinQuantity"
              placeholder="Minimum Quantity"
              value={formData.proMinQuantity}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Product Price
            </label>
            <input
              type="text"
              name="productPrice"
              placeholder="Price"
              value={formData.productPrice}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group ">
            <label>
              Product Description
            </label>
            <textarea
              type="text"
              name="productDescription"
              placeholder="Product description"
              value={formData.productDescription}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Tags <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              type="text"
              name="tags"
              placeholder="enter some keywords for this product to search"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group full-width">
            <label>
              Upload Image<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="file"
              name="imageUrl"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              ref={fileInputRef} // <-- attach ref here
            />
            <small>
              Image must be 500 x 500 pixels and in .png, .jpeg, or .jpg format
              and then 500 kb
            </small>
            <small style={{ color: "gray" }}>
              Note: first should be front image, second should be side image,
              third should be back image{" "}
            </small>
            <ul>
              {formData.imageUrl &&
                formData.imageUrl.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
            </ul>
          </div>

          <div className="form-group full-width">
            <button type="submit">Upload</button>
          </div>
        </form>
      ) : (
        <form className="upload-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>
              Product Name update<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Product Code<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="productCode"
              placeholder="Enter product code"
              value={formData.productCode}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              readOnly
            />
          </div>

          <div className="form-group">
            <label>
              Category<span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="selectedCategory"
              value={formData.selectedCategory}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            >
              <option value="">Choose Category</option>
              {category.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              Subcategory<span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="selectedSubCategory"
              value={formData.selectedSubCategory}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            >
              <option value="">Choose Subcategory</option>
              {subcategory.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {
            formData.productType && (
              <div className="form-group">
            <label>
              Product Type
            </label>
            <input
              type="text"
              name="productType"
              placeholder="Product Type"
              value={formData.productType}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
            )
          }

          {/* <div className="form-group">
            <label>
              {formData.selectedCategory === "67dd46e9ad2dfed36bb7437c" ||
              formData.selectedCategory === "67dd46e9ad2dfed36bb7437f"
                ? "Fabric Type"
                : "Material Type"}
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="fabricType"
              placeholder={
                formData.selectedCategory === "67dd46e9ad2dfed36bb7437c" ||
                formData.selectedCategory === "67dd46e9ad2dfed36bb7437f"
                  ? "Fabric Type"
                  : "Material Type"
              }
              value={formData.fabricType}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div> */}
          {formData.fabricType && (
            <div className="form-group">
              <label>Fabric Type</label>
              <input
                type="text"
                name="fabricType"
                value={formData.fabricType}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            </div>
          )}

          {formData.capacity && (
            <div className="form-group">
              <label>
                Capacity
              </label>
              <input
                type="text"
                name="capacity"
                placeholder="Size"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            </div>
          )}
          {
            formData.productSize &&(
              <div className="form-group">
            <label>
              Product Size
            </label>
            <input
              type="text"
              name="productSize"
              placeholder="Size"
              value={formData.productSize}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
            )
          }

          {
            formData.materialType && (
              <div className="form-group">
            <label>
              Material Type
            </label>
            <input
              type="text"
              name="materialType"
              placeholder="Size"
              value={formData.materialType}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
            )
          }

          {
            formData.productColor && (
              <div className="form-group">
            <label>
              Product Color
            </label>
            <input
              type="text"
              name="productColor"
              placeholder="Color"
              value={formData.productColor}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
            )
          }

          {
            formData.proMinQuantity && (
              <div className="form-group">
            <label>Minimum Quantity</label>
            <input
              type="text"
              name="proMinQuantity"
              placeholder="Minimum Quantity"
              value={formData.proMinQuantity}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
            )
          }

         {
          formData.productPrice && (
             <div className="form-group">
            <label>
              Product Price
            </label>
            <input
              type="text"
              name="productPrice"
              placeholder="Price"
              value={formData.productPrice}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          )
         }

         {
          formData.productDescription && (
             <div className="form-group ">
            <label>
              Product Description
            </label>
            <textarea
              type="text"
              name="productDescription"
              placeholder="Product description"
              value={formData.productDescription}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          )
         }

          {
            formData.tags && (
              <div className="form-group">
            <label>
              Tags 
            </label>
            <textarea
              type="text"
              name="tags"
              placeholder="enter some keywords for this product to search"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
            )
          }

          <div className="form-group full-width">
            <label>
              Upload Image<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="file"
              name="imageUrl"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              ref={fileInputRef} // <-- attach ref here
            />
            <small>
              Image must be 500 x 500 pixels and in .png, .jpeg, or .jpg format
              and then 500 kb
            </small>
            <small style={{ color: "gray" }}>
              Note: first should be front image, second should be side image,
              third should be back image{" "}
            </small>
            <ul>
              {/* {formData.imageUrl &&
                formData.imageUrl.map((file, index) => (
                  <li key={index}>{file}</li>
                ))} */}

              {formData.existingImages.map((url, index) => (
                <img
                  key={index}
                  src={`${backendEndApiBannerUpload}/${url}`}
                  alt={`existing ${index}`}
                  width="100"
                />
              ))}

              {formData.imageUrl.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`new upload ${index}`}
                  width="100"
                />
              ))}
            </ul>
          </div>

          <div className="form-group full-width">
            <button type="submit">Update</button>
          </div>
        </form>
      )}
    </>
  );
};

export default UploadProducts;
