import { useState } from "react";
import dragIcon from "../imgs/drag.png";
import pencilIcon from "../imgs/pencil.png";

const SelectedProducts = ({ allProducts, onToggleModal }) => {
    const [products, setProducts] = useState([{ name: "", id: "" }]);

    const handleAddProduct = () => {
        setProducts([...products, { name: "", id: "" }]);
    };

    const handleDeleteProduct = (index) => {
        setProducts(products.filter((product, i) => i !== index));
    };

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const newProducts = [...products];
        newProducts[index][name] = value;
        setProducts(newProducts);
    };

    return (
        <form>
            {products.map((product, index) => (
                <div key={index}>
                    <img src={dragIcon} />
                    <div>{index + 1}.</div>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        placeholder="Select product"
                        onChange={(event) => handleInputChange(event, index)}
                    />
                    <img src={pencilIcon} onClick={onToggleModal} />
                    <input
                        type="number"
                        name="discountValue"
                        onChange={(event) => handleInputChange(event, index)}
                    />
                    <select
                        name="discountType"
                        onChange={(event) => handleInputChange(event, index)}
                    >
                        <option value="percent">% off</option>
                        <option value="flat">Flat Off</option>
                    </select>
                    <button type="button">Edit</button>
                    <button
                        type="button"
                        onClick={() => handleDeleteProduct(index)}
                    >
                        X
                    </button>
                </div>
            ))}
            <button onClick={handleAddProduct}>Add Product</button>
        </form>
    );
};

export default SelectedProducts;
