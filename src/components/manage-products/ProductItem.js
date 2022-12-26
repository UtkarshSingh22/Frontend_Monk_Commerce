import dragIcon from "../../imgs/drag.png";
import pencilIcon from "../../imgs/pencil.png";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Fragment } from "react";

const ProductItem = ({
    index,
    product,
    handleEditProduct,
    products,
    addDiscountHandler,
    handleDeleteProduct,
    showVariantsHandler,
    handleDeleteVariant,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: index });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
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
                <div>
                    {products[index].variants.map((variant, varIndex) => {
                        return (
                            <div key={varIndex}>
                                <img src={dragIcon} alt="drag icon" />
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
                                        products[index].variants.length === 1
                                            ? handleDeleteProduct(index)
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
                    })}
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
    );
};

export default ProductItem;
