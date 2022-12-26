import dragIcon from "../../imgs/drag.png";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Fragment } from "react";

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
        <div style={style}>
            <img
                src={dragIcon}
                alt="drag icon"
                ref={setNodeRef}
                {...attributes}
                {...listeners}
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
                    <input type="number" name="discountValue" />
                    <select name="discountType">
                        <option value="percent">% off</option>
                        <option value="flat">Flat Off</option>
                    </select>
                </Fragment>
            )}
            <button
                type="button"
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
