import { Fragment, useState } from "react";
import Modal from "./Modal";

const ProductPicker = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const modalToggleHandler = () => {
        setModalOpen((prevState) => !prevState);
    };

    const inputChangeHandler = (event) => {
        setSearchInput(event.target.value);
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
                    <button onClick={modalToggleHandler}>Add Product</button>
                </div>
            </section>
            {modalOpen && (
                <Modal onCloseModal={modalToggleHandler}>
                    <h2>Add products</h2>
                    <input type="text" onChange={inputChangeHandler} />
                </Modal>
            )}
        </Fragment>
    );
};

export default ProductPicker;
