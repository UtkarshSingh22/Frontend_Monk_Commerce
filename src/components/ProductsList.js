import { Fragment, useState } from "react";

const ProductsList = ({ items }) => {
    const [checkboxValues, setCheckboxValues] = useState([]);
    const [variantValues, setVariantValues] = useState([[]]);

    const handleProductChange = (index) => {
        setCheckboxValues([
            ...checkboxValues.slice(0, index),
            !checkboxValues[index],
            ...checkboxValues.slice(index + 1),
        ]);
    };

    const handleVariantChange = (index, varIndex) => {
        setVariantValues([
            ...variantValues.slice(0, index),
            [
                ...variantValues[index].slice(0, varIndex),
                !variantValues[index][varIndex],
                ...variantValues[index].slice(varIndex + 1),
            ],
            ,
            ...variantValues.slice(index + 1),
        ]);
    };

    return (
        <Fragment>
            <ul>
                {items.map((item, index) => {
                    return (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={checkboxValues[index] || false}
                                onChange={handleProductChange(index)}
                            />
                            <img src={item.image.src} />
                            <div>{item.title}</div>
                            <ul>
                                {item.variants.map((variant, varIndex) => {
                                    return (
                                        <li key={varIndex}>
                                            <input
                                                type="checkbox"
                                                // checked={variantValues[index][varIndex] || false}
                                                onChange={handleVariantChange(
                                                    index,
                                                    varIndex
                                                )}
                                            />
                                            <div>{variant.title}</div>
                                            <div>{variant.price}</div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
            <p></p>
            <button>Cancel</button>
            <button>Add</button>
        </Fragment>
    );
};

export default ProductsList;
