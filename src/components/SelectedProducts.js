import { Fragment, useEffect, useState } from "react";
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
        }
    }, [modalOpen]);

    return (
        <Fragment>
            {products.map((product, index) => (
                <div key={index}>
                    <img src={dragIcon} alt='drag icon' />
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
                        alt='edit icon'
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
                        // <div>
                        //     {products[index].variants.map(
                        //         (variant, varIndex) => {
                        //             <div>
                        //                 <img src={dragIcon} />
                        //                 <input
                        //                     type="text"
                        //                     name="name"
                        //                     value={variant.name}
                        //                     placeholder="Select product"
                        //                     readOnly
                        //                 />
                        //                 <input
                        //                     type="number"
                        //                     name="discountValue"
                        //                 />
                        //                 <select name="discountType">
                        //                     <option value="percent">
                        //                         % off
                        //                     </option>
                        //                     <option value="flat">
                        //                         Flat Off
                        //                     </option>
                        //                 </select>
                        //                 <button
                        //                     type="button"
                        //                     onClick={() =>
                        //                         handleDeleteProduct(index)
                        //                     }
                        //                 >
                        //                     X
                        //                 </button>
                        //             </div>;
                        //         }
                        //     )}
                        // </div>
                        <div>{index}</div>
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
