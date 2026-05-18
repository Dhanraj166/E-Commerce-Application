import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setActiveImg(res.data.thumbnail);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="product-container">
      <div className="product-header">
        <h2>{product.title}</h2>
        <p><b>Brand:</b> {product.brand}</p>
        <p><b>Category:</b> {product.category}</p>
      </div>

      <div className="product-main">
        {/* Images */}
        <div className="product-image">
          <img src={activeImg} alt={product.title} />

          <div className="thumbnail-list">
            {product.images.map((img, index) => (
              <button key={index} onClick={() => setActiveImg(img)}>
                <img src={img} alt={`${product.title}-${index}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="product-info">
          <p className="price">${product.price}</p>
          <p>Discount: {product.discountPercentage}%</p>
          <p className="rating">⭐ {product.rating}</p>
          <p>Stock: {product.stock}</p>

          <div className="section">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;