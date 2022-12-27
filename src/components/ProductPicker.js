import { useEffect, useState } from "react";
import Modal from "./add-products/Modal";
import ProductList from "./add-products/ProductList";
import SelectedProducts from "./manage-products/SelectedProducts";
import styles from "../styles/ProductPicker.module.css";

const ProductPicker = () => {
    //state for storing whether modal is open/close
    const [modalOpen, setModalOpen] = useState(false);

    //state for storing search input
    const [searchInput, setSearchInput] = useState("");

    //state for storing fetched products from API
    const [productData, setProductData] = useState([]);

    //state for storing the loading state
    const [loading, setLoading] = useState(false);

    //state for storing selected items
    const [selectedItems, setSelectedItems] = useState({});

    //opening and closing of modal
    const modalToggleHandler = () => {
        setModalOpen((prevState) => !prevState);
    };

    //updating search input
    const inputChangeHandler = (event) => {
        setSearchInput(event.target.value);
    };

    //fetching products from the API
    const fetchProducts = async (searchInput, page = 1) => {
        setLoading(true)
        try {
            const response = await fetch(
                `https://stageapibc.monkcommerce.app/admin/shop/product?search=${searchInput}&page=${page}`
            );
            const data = await response.json();
            setProductData(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    };

    useEffect(() => {
        fetchProducts("");
    }, []);

    //filtering data as per search
    useEffect(() => {
        fetchProducts(searchInput);
    }, [searchInput]);

    //fetching the selected items from modal component
    const getSelectedItems = (items) => {
        setSelectedItems(items);
    };

    return (
        <div className={styles.main}>
            <header>Monk Upsell & Cross-sell</header>
            <section>
                <h2>Add Products</h2>
                <div className={styles.content}>
                    <div className={styles.heading}>
                        <h3>Product</h3>
                        <h3>Discount</h3>
                    </div>
                    <SelectedProducts
                        allProducts={productData}
                        onToggleModal={modalToggleHandler}
                        selectedItems={selectedItems}
                    />
                </div>
            </section>
            {modalOpen && (
                <Modal
                    onCloseModal={modalToggleHandler}
                    className={styles.modal}
                >
                    <div className={styles.head}>
                        <div>Add products</div>
                        <div
                            onClick={modalToggleHandler}
                            className={styles.del}
                        >
                            X
                        </div>
                    </div>
                    <input
                        type="text"
                        onChange={inputChangeHandler}
                        value={searchInput}
                        className={styles.input}
                        placeholder="Search product"
                    />
                    {loading && <h2>Loading...</h2>}
                    {!loading && <ProductList
                        products={productData ? productData : []}
                        onCloseModal={modalToggleHandler}
                        onSelectItems={getSelectedItems}
                        setSearchInput={setSearchInput}
                    />}
                </Modal>
            )}
        </div>
    );
};

export default ProductPicker;
