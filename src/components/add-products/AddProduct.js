import styles from "../../styles/AddProduct.module.css";

const AddProduct = ({
    products,
    selected,
    totalProducts,
    handleChange,
    handleClick,
    onCloseModal,
    hasMore
}) => {
    return (
        <div>
            <div className={styles.main}>
                {products.map((product, index) => (
                    <div key={index} className={styles.product}>
                        <div className={styles.head}>
                            <input
                                type="checkbox"
                                value={product.id}
                                onChange={handleChange}
                                checked={product.id in selected}
                            />
                            <img src={product.image.src} />
                            <div>{product.title}</div>
                        </div>
                        <div className={styles.variants}>
                            {product.variants.map((variant, varIndex) => (
                                <div
                                    key={varIndex}
                                    className={styles.variant}
                                >
                                    <div>
                                        <input
                                            type="checkbox"
                                            name={variant.id}
                                            value={product.id}
                                            onChange={handleChange}
                                            checked={
                                                !selected[product.id]
                                                    ? false
                                                    : selected[
                                                          product.id
                                                      ].includes(variant.id)
                                            }
                                        />
                                        <div>{variant.title}</div>
                                    </div>
                                    <div>
                                        {variant.inventory_quantity && (
                                            <div>
                                                {variant.inventory_quantity}{" "}
                                                available{" "}
                                            </div>
                                        )}
                                        <div>₹{variant.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {hasMore && <h3>Loading more products...</h3>}
            <div className={styles.buttons}>
                <div>{totalProducts} products selected</div>
                <div>
                    <button onClick={onCloseModal} className={styles.cancel}>Cancel</button>
                    <button onClick={handleClick} className={styles.add}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
