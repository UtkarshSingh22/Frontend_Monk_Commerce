import dragIcon from "../../imgs/drag.png";
import pencilIcon from "../../imgs/pencil.png";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Fragment } from "react";
import VariantItem from "./VariantItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const ProductItem = ({
    index,
    product,
    handleEditProduct,
    products,
    setProducts,
    addDiscountHandler,
    handleDeleteProduct,
    showVariantsHandler,
    handleDeleteVariant,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: index.toString() });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleDragEnd = (event, index) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setProducts((items) => {
                const newState = [...items];
                newState[index].variants = arrayMove(
                    items[index].variants,
                    active.id,
                    over.id
                );
                return newState;
            });
        }
    };

    return (
        <div style={style}>
            <img
                src={dragIcon}
                alt="drag icon"
                ref={setNodeRef}
                {...attributes}
                {...listeners}
            />
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
            <button type="button" onClick={() => handleDeleteProduct(index)}>
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
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={(event) => handleDragEnd(event, index)}
                >
                    <div>
                        <SortableContext
                            items={products[index].variants}
                            strategy={verticalListSortingStrategy}
                        >
                            {products[index].variants.map(
                                (variant, varIndex) => {
                                    return (
                                        <VariantItem
                                            key={varIndex}
                                            index={index}
                                            varIndex={varIndex}
                                            variant={variant}
                                            products={products}
                                            handleDeleteProduct={
                                                handleDeleteProduct
                                            }
                                            handleDeleteVariant={
                                                handleDeleteVariant
                                            }
                                        />
                                    );
                                }
                            )}
                        </SortableContext>
                    </div>
                </DndContext>
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
    );
};

export default ProductItem;
