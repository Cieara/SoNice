import Ratings from "react-ratings-declarative";
import { Link } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { getProductById } from "../../services/productservice";
import SoNiceContext from "../../SoNiceContext";

const iconPath =
    "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function ProductDetailViewPage() {

    const { slug } = useParams();
    const { setShoppingBasket } = useContext(SoNiceContext);
    const { shoppingBasket } = useContext(SoNiceContext);


    function changeRating(newRating) { }

    const [data, setData] = useState({ name: '', price: 0, description: '', rating: 0, category: '', id: 0 });

    useEffect(() => {
        const fetchData = async () => {
            var result = await getProductById(slug);
            console.log(result);
            setData(result);
        }

        fetchData();
    }, []);

    const handleAddToCart = (e) => {
        let currentshoppingbasket = shoppingBasket;
        console.log(currentshoppingbasket);
        let newitem = {
            name: data.name,
            price: data.price,
            id: data.id,
            image: data.image,
            category: data.category
        }
        currentshoppingbasket.push(newitem);
        setShoppingBasket(currentshoppingbasket);
    }

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <ScrollToTopOnMount />
            <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
                <ol className="breadcrumb p-3">
                    <li className="breadcrumb-item">
                        <Link className="text-decoration-none link-secondary" to="/products">
                            All Prodcuts
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <a className="text-decoration-none link-secondary" href="!#">
                            {data.category}
                        </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {data.name}
                    </li>
                </ol>
            </nav>
            <div className="row mb-1">
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <img
                                className="border rounded ratio ratio-1x1"
                                alt=""
                                src={`data:image/jpg;base64,${data.image}`}
                            />
                        </div>
                    </div>

                </div>

                <div className="col-lg-5">
                    <div className="d-flex flex-column h-100">
                        <h2 className="mb-1">{data.name}</h2>
                        <h4 className="text-muted mb-4">£{data.price}</h4>

                        <div className="row g-3 mb-4">
                            <div className="col">
                                <button className="btn btn-outline-dark py-2 w-100" onClick={(e) => handleAddToCart(e)}>
                                    Add to cart
                                </button>
                            </div>
                            <div className="col">
                                <Link to={"/checkout"} href="!#" replace>
                                    <button className="btn btn-dark py-2 w-100" onClick={(e) => handleAddToCart(e)}>Buy now</button>
                                </Link>
                            </div>
                        </div>

                        <h4 className="mb-0">Details</h4>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-4">Code</dt>
                            <dd className="col-sm-8 mb-3">{data.id}</dd>

                            <dt className="col-sm-4">Category</dt>
                            <dd className="col-sm-8 mb-3">{data.category}</dd>

                            <dt className="col-sm-4">Stock</dt>
                            <dd className="col-sm-8 mb-3">{data.stock}</dd>

                            <dt className="col-sm-4">Rating</dt>
                            <dd className="col-sm-8 mb-3">
                                <Ratings
                                    rating={data.rating}
                                    widgetRatedColors="rgb(253, 204, 13)"
                                    changeRating={changeRating}
                                    widgetSpacings="2px"
                                >
                                    {Array.from({ length: data.rating }, (_, i) => {
                                        return (
                                            <Ratings.Widget
                                                key={i}
                                                widgetDimension="20px"
                                                svgIconViewBox="0 0 19 20"
                                                svgIconPath={iconPath}
                                                widgetHoverColor="rgb(253, 204, 13)"
                                            />
                                        );
                                    })}
                                </Ratings>
                            </dd>
                        </dl>

                        <h4 className="mb-0">Description</h4>
                        <hr />
                        <p className="lead flex-shrink-0">
                            <small>
                                {data.description}
                            </small>
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default ProductDetailViewPage;
