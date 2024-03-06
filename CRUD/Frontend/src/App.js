import React from "react";
import ProductList from "./productList";
import { deleteData, getData, putData, postData } from './api';
import { useEffect, useState } from 'react';
import ProductForm from "./form";

const App = () => {
    const [products, setProducts] = useState([]);
    const [edit, setEdit] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [initialForm, setForm] = useState({ name: '', price: '', category: '' })
    useEffect(() => {
        getAllProducts();
    }, [])

    async function getAllProducts() {
        const response = await getData();
        setProducts(response.data);
    }
    async function addProduct(product) {
        let data = {
            name: product.name,
            price: product.price,
            category: product.category
        }
        if (edit)
            await putData(product.id, data);
        else
            await postData(data);
        getAllProducts();
        setOpenForm(false);


    }
    async function deleteProduct(id) {
        await deleteData(id);
        getAllProducts();
    }

    function editProduct(value) {
        setEdit(true);
        setOpenForm(true);
        setForm(value)

    }
    function closeForm() {
        setOpenForm(false)
    }
    function showForm() {
        setForm({ name: '', price: '', category: '' })
        setOpenForm(true);
        setEdit(false);

    }

    return (

        <div className="wrapper m-5 w-50">
            <h2 className="text-primary text-center">CRUD Operations with React JS</h2>
            <button className="btn btn-primary float-end" onClick={() => { showForm() }}>Add new</button>
            <ProductList products={products} deleteProduct={deleteProduct} editProduct={editProduct}></ProductList>
            {openForm && <ProductForm addProduct={addProduct} data={initialForm} closeForm={closeForm}  ></ProductForm>}
        </div>

    )

};

export default App;
