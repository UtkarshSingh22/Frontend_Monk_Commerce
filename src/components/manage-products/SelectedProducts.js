import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ProductItem from "./ProductItem";

const SelectedProducts = ({ allProducts, onToggleModal, selectedItems }) => {
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

    const memoizeSelectedItems = useMemo(() => selectedItems, [selectedItems]);

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
        if (Object.keys(selectedItems).length) {
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
    }, [memoizeSelectedItems]);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setProducts((items) => {
                return arrayMove(items, active.id, over.id);
            });
        }
    };

    return (
        <Fragment>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div>
                    <SortableContext
                        items={products}
                        strategy={verticalListSortingStrategy}
                    >
                        {products.map((product, index) => (
                            <ProductItem
                                key={index}
                                index={index}
                                product={product}
                                handleEditProduct={handleEditProduct}
                                products={products}
                                addDiscountHandler={addDiscountHandler}
                                handleDeleteProduct={handleDeleteProduct}
                                showVariantsHandler={showVariantsHandler}
                                handleDeleteVariant={handleDeleteVariant}
                            />
                        ))}
                    </SortableContext>
                </div>
            </DndContext>

            <button onClick={handleAddProduct}>Add Product</button>
        </Fragment>
    );
};

export default SelectedProducts;
