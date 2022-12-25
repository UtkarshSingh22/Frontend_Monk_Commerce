import React, { useState } from "react";
import AddProduct from "./AddProduct";

function ProductList({ products, onCloseModal, onSelectItems }) {
    // State to store the selected products and their variants
    const [selected, setSelected] = useState({});
    const [totalProducts, setTotalProducts] = useState(0);

    // Handle change event for checkboxes
    const handleChange = (event) => {
        const productId = event.target.value;
        const variantId = event.target.name;
        const isChecked = event.target.checked;

        if (variantId.length) {
            let productChecked = 0;
            for (let product of products) {
                if (product.id == productId) {
                    for (let variant of product.variants) {
                        if (selected[variant.id] === true) {
                            productChecked++;
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

            isChecked
                ? !productChecked &&
                  setTotalProducts((prevState) => prevState + 1)
                : productChecked === 1 &&
                  setTotalProducts((prevState) => prevState - 1);
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

            isChecked === true
                ? setTotalProducts((prevState) => prevState + 1)
                : setTotalProducts((prevState) => prevState - 1);
        }
    };
    // Handle click event for the "Add" button
    const handleClick = () => {
        onSelectItems(selected);
        onCloseModal()
        setSelected({})
        setTotalProducts(0)
    };

    return (
        <AddProduct
            products={products}
            selected={selected}
            totalProducts={totalProducts}
            handleChange={handleChange}
            handleClick={handleClick}
            onCloseModal={onCloseModal}
        />
    );
}

export default ProductList;
