import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ProductItem from "./ProductItem";

const SelectedProducts = ({ allProducts, onToggleModal, selectedItems }) => {
    //State for storing the list of selected products
    const [products, setProducts] = useState([
        {
            name: "",
            id: "",
            variants: [],
            showVariants: false,
            addDiscount: false,
        },
    ]);

    //State for storing the index of element on which edit button was clicked
    const [newIndex, setNewIndex] = useState();

    //Prevent re-rendering of selectedItems object
    const memoizeSelectedItems = useMemo(() => selectedItems, [selectedItems]);

    const navigate = useNavigate();

    //Handle adding product
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

    //Handle deleting product
    const handleDeleteProduct = (index) => {
        setProducts(products.filter((product, i) => i !== index));
    };

    //Handle editing product
    const handleEditProduct = (index) => {
        onToggleModal();
        setNewIndex(index);
    };

    //Handle showing variants
    const showVariantsHandler = (index) => {
        const newItems = products;
        newItems[index].showVariants = !products[index].showVariants;
        setProducts(newItems);
        navigate("/");
    };

    //Handle deleting variant
    const handleDeleteVariant = (index, varIndex) => {
        const newItems = products;
        newItems[index].variants.splice(varIndex, 1);
        setProducts(newItems);
        navigate("/");
    };

    //Handle add discount button
    const addDiscountHandler = (index) => {
        const newItems = products;
        newItems[index].addDiscount = true;
        setProducts(newItems);
        navigate("/");
    };

    useEffect(() => {
        //Adding the selected items to the state
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

    //Drag and drop functionality
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
                            <div>
                                <ProductItem
                                    key={index}
                                    index={index}
                                    product={product}
                                    handleEditProduct={handleEditProduct}
                                    products={products}
                                    setProducts={setProducts}
                                    addDiscountHandler={addDiscountHandler}
                                    handleDeleteProduct={handleDeleteProduct}
                                    showVariantsHandler={showVariantsHandler}
                                    handleDeleteVariant={handleDeleteVariant}
                                />
                                <div className="end"></div>
                            </div>
                        ))}
                    </SortableContext>
                </div>
            </DndContext>

            <button className="add" onClick={handleAddProduct}>
                Add Product
            </button>
        </Fragment>
    );
};

export default SelectedProducts;
