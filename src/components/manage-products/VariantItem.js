import dragIcon from "../../imgs/drag.png";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Fragment } from "react";
import styles from "../../styles/VariantItem.module.css";

const VariantItem = ({
    index,
    varIndex,
    variant,
    products,
    handleDeleteProduct,
    handleDeleteVariant,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: varIndex.toString() });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div style={style} className={styles.item}>
            <img
                src={dragIcon}
                className={styles.drag}
                alt="drag icon"
                ref={setNodeRef}
                {...attributes}
                {...listeners}
            />
            <input
                type="text"
                name="name"
                value={variant.name}
                className={styles.name}
                placeholder="Select product"
                readOnly
            />
            {products[index].addDiscount && (
                <Fragment>
                    <input type="number" name="discountValue" className={styles.amount}/>
                    <select name="discountType" className={styles.select}>
                        <option value="percent">% off</option>
                        <option value="flat">Flat Off</option>
                    </select>
                </Fragment>
            )}
            <button
                type="button"
                className={styles.delete}
                onClick={() =>
                    products[index].variants.length === 1
                        ? handleDeleteProduct(index)
                        : handleDeleteVariant(index, varIndex)
                }
            >
                X
            </button>
        </div>
    );
};

export default VariantItem;
