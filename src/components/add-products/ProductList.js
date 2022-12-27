import React, { useState } from "react";
import AddProduct from "./AddProduct";

function ProductList({ products, onCloseModal, onSelectItems, setSearchInput, hasMore }) {
    // State to store the selected products and their variants
    const [selected, setSelected] = useState({});

    //state for storing the number of products selected
    const [totalProducts, setTotalProducts] = useState(0);

    // Handle change event for checkboxes
    const handleChange = (event) => {
        const productId = event.target.value;
        const variantId = event.target.name;
        const isChecked = event.target.checked;

        if (variantId.length) {
            //when the variant product is checked/unchecked
            if (isChecked) {
                const items = [...(selected[productId] || [])];
                (!selected[productId] ||
                    !selected[productId].includes(+variantId)) &&
                    items.push(+variantId);

                setSelected({
                    ...selected,
                    [productId]: items,
                });
            } else {
                const items = selected[productId].filter((itemId) => {
                    return itemId !== +variantId;
                });
                console.log(items);

                if (!items.length) {
                    const selectedItems = { ...selected };
                    delete selectedItems[productId];
                    setSelected(selectedItems);
                } else {
                    setSelected({
                        ...selected,
                        [productId]: items,
                    });
                }
            }

            isChecked
                ? !selected[productId] &&
                  setTotalProducts((prevState) => prevState + 1)
                : selected[productId].length === 1 &&
                  setTotalProducts((prevState) => prevState - 1);
        } else {
            //when the parent product is checked/unchecked
            const product = products.find((p) => p.id == productId);

            if (isChecked) {
                setSelected({
                    ...selected,
                    [productId]: product.variants.reduce((acc, variant) => {
                        acc.push(variant.id);
                        return acc;
                    }, []),
                });
            } else {
                const items = selected;
                delete items[productId];
                setSelected(items);
            }

            isChecked
                ? setTotalProducts((prevState) => prevState + 1)
                : setTotalProducts((prevState) => prevState - 1);
        }
    };
    // Handle click event for the "Add" button
    const handleClick = () => {
        onSelectItems(selected);
        onCloseModal();
        setSearchInput('')
        setSelected({});
        setTotalProducts(0);
    };

    return (
        <AddProduct
            products={products}
            selected={selected}
            totalProducts={totalProducts}
            handleChange={handleChange}
            handleClick={handleClick}
            onCloseModal={onCloseModal}
            hasMore={hasMore}
        />
    );
}

export default ProductList;
