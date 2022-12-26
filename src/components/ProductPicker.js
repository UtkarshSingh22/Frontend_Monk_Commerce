import { useEffect, useState } from "react";
import Modal from "./add-products/Modal";
import ProductList from "./add-products/ProductList";
import SelectedProducts from "./manage-products/SelectedProducts";
import styles from '../styles/ProductPicker.module.css'

const ProductPicker = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [productData, setProductData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});

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
        if (!searchInput.length) {
            setFilteredData([]);
        } else {
            const filteredItems = [];

            for (let item of productData) {
                if (
                    item.title.toLowerCase().includes(searchInput.toLowerCase())
                ) {
                    filteredItems.push(item);
                }
            }

            setFilteredData(filteredItems);
        }
    }, [searchInput]);

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
                <Modal onCloseModal={modalToggleHandler} className={styles.modal}>
                    <div className={styles.head}>
                        <div>Add products</div>
                        <div onClick={modalToggleHandler} className={styles.del}>X</div>
                    </div>
                    <input
                        type="text"
                        onChange={inputChangeHandler}
                        value={searchInput}
                        className={styles.input}
                        placeholder='Search product'
                    />
                    <ProductList
                        products={filteredData}
                        onCloseModal={modalToggleHandler}
                        onSelectItems={getSelectedItems}
                    />
                </Modal>
            )}
        </div>
    );
};

export default ProductPicker;
