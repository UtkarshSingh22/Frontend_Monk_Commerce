const ProductCart = ({
    products,
    selected,
    totalProducts,
    handleChange,
    handleClick,
    onCloseModal,
}) => {
    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <input
                        type="checkbox"
                        value={product.id}
                        onChange={handleChange}
                        checked={selected[product.id] === true}
                    />
                    <img src={product.image.src} />
                    <h3>{product.title}</h3>
                    {product.variants.map((variant) => (
                        <div key={variant.id}>
                            <input
                                type="checkbox"
                                name={variant.id}
                                value={product.id}
                                onChange={handleChange}
                                checked={selected[variant.id] === true}
                            />
                            {variant.title}
                        </div>
                    ))}
                </div>
            ))}
            <div>{totalProducts} products selected</div>
            <button onClick={onCloseModal}>Cancel</button>
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default ProductCart;
