import { Fragment, useState } from "react";

const ProductPicker = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const modalOpenHandler = () => {
        setModalOpen(true);
    };

    

    return (
        <Fragment>
            <header>Monk Upsell & Cross-sell</header>
            <section>
                <h2>Add Products</h2>
                <div>
                    <div>
                        <h3>Product</h3>
                        <h3>Discount</h3>
                    </div>
                    <div></div>
                    <button onClick={modalOpenHandler}>Add Product</button>
                </div>
            </section>
        </Fragment>
    );
};

export default ProductPicker;
