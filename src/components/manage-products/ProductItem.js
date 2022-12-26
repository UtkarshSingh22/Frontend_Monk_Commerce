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
import styles from "../../styles/ProductItem.module.css";

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
            <div className={styles.item}>
                <img
                    src={dragIcon}
                    alt="drag icon"
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                    className={styles.drag}
                />
                <div>{index + 1}.</div>
                <div className={styles.input}>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        className={styles.name}
                        placeholder="Select product"
                        readOnly
                    />
                    <img
                        src={pencilIcon}
                        alt="edit icon"
                        className={styles.edit}
                        onClick={() => handleEditProduct(index)}
                    />
                </div>
                {!products[index].addDiscount && (
                    <button
                        className={styles.discount}
                        onClick={() => addDiscountHandler(index)}
                        disabled={!products[index].name.length}
                    >
                        Add discount
                    </button>
                )}
                {products[index].addDiscount && (
                    <Fragment>
                        <input
                            type="number"
                            name="discountValue"
                            placeholder="Amount"
                            className={styles.amount}
                        />
                        <select name="discountType" className={styles.select}>
                            <option value="percent">% off</option>
                            <option value="flat">Flat Off</option>
                        </select>
                    </Fragment>
                )}
                <button
                    className={styles.delete}
                    type="button"
                    onClick={() => handleDeleteProduct(index)}
                >
                    X
                </button>
            </div>
            <div className={styles.show}>
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
                            <div className={styles.variants}>
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
                            </div>
                        </SortableContext>
                    </div>
                </DndContext>
                )}
        </div>
    );
};

export default ProductItem;
