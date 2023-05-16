import { Link } from "react-router-dom";
import { Toast, ToastBody, ToastHeader, Button } from "reactstrap";
import SoNiceContext from "../../SoNiceContext";
import { useContext } from "react";
import CreditCardWidget from "../../components/CreditCardWidget/CreditCardWidget";


function Checkout() {
    const { setShoppingBasket } = useContext(SoNiceContext);
    const { shoppingBasket } = useContext(SoNiceContext);

    const handleClickRemoveItem = (id) => {
        console.log(id)
        var items = shoppingBasket.filter((element, index) => index !== id);
        //var items = shoppingBasket.filter(item => item.id !== id);
        setShoppingBasket(items)
    }
    const total = () => {
        let totalprice = 0;
        console.log(shoppingBasket)
        for (let i = 0; i < shoppingBasket.length; i++) {
            totalprice += shoppingBasket[i].price;
        }
        return (Math.round(totalprice * 100) / 100).toFixed(2);
    }
    return (
        <div className="container mt-5 py-4 px-xl-5">
            <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
                <ol className="breadcrumb p-3">
                    <li className="breadcrumb-item">
                        <Link className="text-decoration-none link-secondary" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <a className="text-decoration-none link-secondary" href="!#">
                            Checkout
                        </a>
                    </li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-lg-8">
                    {shoppingBasket.map((item, index) => {
                        return (<div className="row mb-4">

                            <div className="col-lg-4">
                                <div className="row">
                                    <div className="col-12 mb-4">
                                        {console.log(item.image)}
                                        { <img
                                            className="border rounded ratio ratio-16x9"
                                            alt=""
                                            src={`data:image/jpg;base64,${item.image}`}
                                            style={{ width: "200px", height: "auto" }}
                                        /> }
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className=" my-2 rounded">
                                    <Toast>
                                        <ToastHeader>
                                            <h6 className="mb-1">{item.name}</h6>
                                            <h6 className="text-muted mb-4">£{item.price}</h6>
                                        </ToastHeader>

                                        <ToastBody>
                                            <dl className="row">
                                                <dt className="col-sm-4"><small>Code</small></dt>
                                                <dd className="col-sm-8 "><small>{item.id}</small></dd>

                                                <dt className="col-sm-4"><small>Category</small></dt>
                                                <dd className="col-sm-8 "><small>{item.category}</small></dd>
                                                <dt className="col-sm-4"><small></small></dt>
                                                <dd className="col-sm-8 "><small><Button outline onClick={()=>handleClickRemoveItem(index) }>Remove Item</Button></small></dd>
                                            </dl>
                                        </ToastBody>
                                    </Toast>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
                <div className="col-lg-4">
                    <Toast>
                        <ToastHeader>
                            <h6 className="mb-1">Total ({shoppingBasket.length} items)</h6>
                            <h6 className="text-muted mb-4">£{total()}</h6>
                        </ToastHeader>

                        <ToastBody>
                            <div className="row">
                                <div className="col-sm-2">
                                </div>
                                <div className="col-sm-3">
                                    <CreditCardWidget merchantId={"BCR2DN4TZLL6V43N"} merchantName={"so nice"} totalPrice={total()} />
                                </div>
                                <div className="col-sm-4">
                                </div>
                            </div>
                        </ToastBody>
                    </Toast>
                </div>
            </div>
        </div>
    )
}

export default Checkout