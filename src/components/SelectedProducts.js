import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dragIcon from "../imgs/drag.png";
import pencilIcon from "../imgs/pencil.png";

const SelectedProducts = ({
    allProducts,
    onToggleModal,
    selectedItems,
    modalOpen,
}) => {
    const [products, setProducts] = useState([
        {
            name: "",
            id: "",
            variants: [],
            showVariants: false,
            addDiscount: false,
        },
    ]);

    const [newIndex, setNewIndex] = useState();

    const navigate = useNavigate();

    const handleAddProduct = (event) => {
        event.preventDefault();
        setProducts([
            ...products,
            {
                name: "",
                id: "",
                variants: [],
                showVariants: false,
                addDiscount: false,
            },
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
        const newItems = products;
        newItems[index].showVariants = !products[index].showVariants;
        setProducts(newItems);
        navigate("/");
    };

    const handleDeleteVariant = (index, varIndex) => {
        const newItems = products;
        newItems[index].variants.splice(varIndex, 1);
        setProducts(newItems);
        navigate("/");
    };

    const addDiscountHandler = (index) => {
        const newItems = products;
        newItems[index].addDiscount = true;
        setProducts(newItems);
        navigate("/");
    };

    useEffect(() => {
        if (!modalOpen) {
            const newItems = [];

            for (let product of allProducts) {
                if (product.id in selectedItems) {
                    newItems.push({
                        name: product.title,
                        id: product.id,
                        variants: [],
                        showVariants: false,
                        addDiscount: false,
                    });
                    const currIndex = newItems.length - 1;

                    for (let variant of product.variants) {
                        if (selectedItems[product.id].includes(variant.id)) {
                            newItems[currIndex].variants.push({
                                name: variant.title,
                                id: variant.id,
                            });
                        }
                    }
                }
            }

            const newProducts = products;
            newProducts.splice(newIndex, 1, ...newItems);

            setProducts(newProducts);
            navigate("/");
        }
    }, [modalOpen]);

    return (
        <Fragment>
            {products.map((product, index) => (
                <div key={index}>
                    <img src={dragIcon} alt="drag icon" />
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
                        alt="edit icon"
                        onClick={() => handleEditProduct(index)}
                    />
                    {!products[index].addDiscount && (
                        <button
                            onClick={() => addDiscountHandler(index)}
                            disabled={!products[index].name.length}
                        >
                            Add discount
                        </button>
                    )}
                    {products[index].addDiscount && (
                        <Fragment>
                            <input type="number" name="discountValue" />
                            <select name="discountType">
                                <option value="percent">% off</option>
                                <option value="flat">Flat Off</option>
                            </select>
                        </Fragment>
                    )}
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
                                    return (
                                        <div key={varIndex}>
                                            <img
                                                src={dragIcon}
                                                alt="drag icon"
                                            />
                                            <input
                                                type="text"
                                                name="name"
                                                value={variant.name}
                                                placeholder="Select product"
                                                readOnly
                                            />
                                            {products[index].addDiscount && (
                                                <Fragment>
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
                                                </Fragment>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    products[index].variants
                                                        .length === 1
                                                        ? handleDeleteProduct(
                                                              index
                                                          )
                                                        : handleDeleteVariant(
                                                              index,
                                                              varIndex
                                                          )
                                                }
                                            >
                                                X
                                            </button>
                                        </div>
                                    );
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
        </Fragment>
    );
};

export default SelectedProducts;
