import { useEffect, useState } from "react";
import dragIcon from "../imgs/drag.png";
import pencilIcon from "../imgs/pencil.png";

const SelectedProducts = ({
    allProducts,
    onToggleModal,
    selectedItems,
    modalOpen,
}) => {
    const [products, setProducts] = useState([
        { name: "", id: "", variants: [], showVariants: false },
    ]);
    const [newIndex, setNewIndex] = useState();

    const handleAddProduct = (event) => {
        event.preventDefault();
        setProducts([
            ...products,
            { name: "", id: "", variants: [], showVariants: false },
        ]);
    };

    const handleDeleteProduct = (index) => {
        setProducts(products.filter((product, i) => i !== index));
    };

    const handleEditProduct = (index) => {
        onToggleModal();
        setNewIndex(index);
    };

    const showVariantsHandler = (index) => {
        setProducts([
            ...products.splice(0, index),
            { ...products[index], showVariants: !products[index].showVariants },
            ...products.splice(index + 1),
        ]);
    };

    console.log(products);

    useEffect(() => {
        if (!modalOpen) {
            const newItems = [];

            for (let product of allProducts) {
                if (selectedItems[product.id]) {
                    newItems.push({
                        name: product.title,
                        id: product.id,
                        variants: [],
                        showVariants: false,
                    });
                    const currIndex = newItems.length - 1;

                    for (let variant of product.variants) {
                        if (selectedItems[variant.id]) {
                            newItems[currIndex].variants.push({
                                name: variant.title,
                                id: variant.id,
                            });
                        }
                    }
                }
            }

            setProducts([
                ...products.splice(0, newIndex),
                ...newItems,
                ...products.splice(newIndex + 1),
            ]);
        }
    }, [modalOpen]);

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
                        readOnly
                    />
                    <img
                        src={pencilIcon}
                        onClick={() => handleEditProduct(index)}
                    />
                    <input type="number" name="discountValue" />
                    <select name="discountType">
                        <option value="percent">% off</option>
                        <option value="flat">Flat Off</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => handleDeleteProduct(index)}
                    >
                        X
                    </button>
                    {products[index].variants.length > 1 &&
                        !products[index].showVariants && (
                            <div
                                onClick={() => {
                                    showVariantsHandler(index);
                                }}
                            >
                                Show variants &darr;
                            </div>
                        )}
                    {(products[index].variants.length === 1 ||
                        products[index].showVariants) && (
                        <div>
                            {products[index].variants.map(
                                (variant, varIndex) => {
                                    <div>
                                        <img src={dragIcon} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={variant.name}
                                            placeholder="Select product"
                                            readOnly
                                        />
                                        <input
                                            type="number"
                                            name="discountValue"
                                        />
                                        <select name="discountType">
                                            <option value="percent">
                                                % off
                                            </option>
                                            <option value="flat">
                                                Flat Off
                                            </option>
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteProduct(index)
                                            }
                                        >
                                            X
                                        </button>
                                    </div>;
                                }
                            )}
                        </div>
                    )}
                    {products[index].showVariants && (
                        <div
                            onClick={() => {
                                showVariantsHandler(index);
                            }}
                        >
                            Hide variants &uarr;
                        </div>
                    )}
                </div>
            ))}
            <button onClick={handleAddProduct}>Add Product</button>
        </form>
    );
};

export default SelectedProducts;
