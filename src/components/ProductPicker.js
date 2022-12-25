import { Fragment, useEffect, useState } from "react";
import Modal from "./Modal";
import ProductList from "./ProductList";

const ProductPicker = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [productData, setProductData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const modalToggleHandler = () => {
        setModalOpen((prevState) => !prevState);
    };

    const inputChangeHandler = (event) => {
        setSearchInput(event.target.value);
    };

    const fetchProducts = async () => {
        const response = await fetch(
            "https://stageapibc.monkcommerce.app/admin/shop/product?search=F&page=1"
        );
        const data = await response.json();

        setProductData(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const filteredItems = [];

        for (let item of productData) {
            if (item.title.toLowerCase().includes(searchInput.toLowerCase())) {
                filteredItems.push(item);
            }
        }

        setFilteredData(filteredItems);
        // console.log(filteredItems)
    }, [searchInput]);

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
                    <input
                        type="text"
                        onChange={inputChangeHandler}
                        value={searchInput}
                    />
                    <ProductList products={filteredData} />
                </Modal>
            )}
        </Fragment>
    );
};

export default ProductPicker;
