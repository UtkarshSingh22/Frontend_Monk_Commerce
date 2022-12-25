import React, { useState } from "react";

function ProductList({ products }) {
    // State to store the selected products and their variants
    const [selected, setSelected] = useState({});

    // Handle change event for checkboxes
    const handleChange = (event) => {
        const productId = event.target.value;
        const variantId = event.target.name;
        const isChecked = event.target.checked;

        if (variantId.length) {
            let productChecked = 0;
            if (!isChecked) {
                for (let product of products) {
                    if (product.id == productId) {
                        for (let variant of product.variants) {
                            if (selected[variant.id] === true) {
                                productChecked++;
                            }
                        }
                    }
                }
            }
            // Update the selected state for the variant and its parent product
            setSelected({
                ...selected,
                [variantId]: isChecked,
                [productId]: isChecked
                    ? true
                    : productChecked > 1
                    ? true
                    : false,
            });
        } else {
            // Update the selected state for the product and its variants
            const product = products.find((p) => p.id == productId);
            
            setSelected({
                ...selected,
                [productId]: isChecked,
                ...product.variants.reduce((acc, variant) => {
                    acc[variant.id] = isChecked;
                    return acc;
                }, {}),
            });
        }
    };
    // Handle click event for the "Add" button
    const handleClick = () => {
        console.log(selected);
    };

    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <input
                        type="checkbox"
                        value={product.id}
                        onChange={handleChange}
                        checked={selected[product.id] === true}
                    />
                    <img src={product.image.src} />
                    <h3>{product.title}</h3>
                    {product.variants.map((variant) => (
                        <div key={variant.id}>
                            <input
                                type="checkbox"
                                name={variant.id}
                                value={product.id}
                                onChange={handleChange}
                                checked={selected[variant.id] === true}
                            />
                            {variant.title}
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleClick}>Add</button>
        </div>
    );
}

export default ProductList;
