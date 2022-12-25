const ProductsList = ({ items }) => {
    console.log(items);
    return (
        <ul>
            {items.map((item) => {
                return <li>
                    <div>{item.title}</div>
                    <ul>
                        {item.variants.map((variant) => {
                            return <li>
                                <div>{variant.title}</div>
                                <div>{variant.price}</div>
                            </li>;
                        })}
                    </ul>
                </li>;
            })}
        </ul>
    );
};

export default ProductsList;
