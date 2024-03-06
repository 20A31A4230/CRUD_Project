import { useState } from "react";

function Form(props) {

    const [product, setProduct] = useState(props.data);
    const [sumitted, setSubmitted] = useState(false)

    let changeFormData = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value })
    }
    return (
        <div className="form-overlay">
            <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input className="form-control mt-2" value={product.name} type="text" name="name" placeholder="Enter Name"
                        onChange={changeFormData} />
                    {
                        sumitted && product.name.length < 5 && <span className="text-danger">Product name must be 5 charecters</span>
                    }

                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input className="form-control mt-2"

                        value={product.price}
                        onChange={changeFormData}

                        type="number" name="price" placeholder="Enter Price" />
                    {
                        sumitted && product.price === "" && <span className="text-danger">Product Price required</span>
                    }
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select className="form-control mt-2" name="category"

                        value={product.category}

                        onChange={changeFormData}

                    >

                        <option value='-1'></option>
                        <option value={'mobiles'}>Mobiles</option>
                        <option value={'laptops'}>Laptops</option>
                        <option value={'tv'}>TV's</option>

                    </select>

                    {
                        sumitted && product.category === "" && <span className="text-danger">Product category required</span>
                    }

                </div>

                <button className="btn btn-primary float-end"

                    onClick={(e) => {
                        setSubmitted(true)
                        e.preventDefault();
                        if (!!product.name && !!product.price && !!product.category) {
                            props.add(product)
                        }



                    }}

                >Send</button>
                <button className="btn btn-danger float-end"
                    onClick={(e) => {
                        e.preventDefault();
                        props.close()


                    }}
                >Cancel</button>

            </form>

        </div>
    )
}


export default Form