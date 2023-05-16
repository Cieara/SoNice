import { Link } from "react-router-dom";
import Product from "./Product";
import ProductH from "./ProductH";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { useEffect, useContext } from "react";
import { getProducts } from "../../services/productservice";
import { getProductsWithCategories } from "../../services/productservice";
import { event, map } from "jquery";
import { resultingClientExists } from "workbox-core/_private";
import SoNiceContext from "../../SoNiceContext";



function Products() {
    const [viewType, setViewType] = useState({ grid: true });

    const [data, setData] = useState({ products: [], priceMax: 0, priceMin: 0, categories: [] });
    const [searchData, setSearchData] = useState([]);
    const [priceMax, setPriceMax] = useState(0);
    const [priceMin, setPriceMin] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const { setAuthenticated } = useContext(SoNiceContext);
    const { authenticated } = useContext(SoNiceContext);
    useEffect(() => {
        const fetchData = async () => {
            var result = await getProductsWithCategories();
            console.log(result)

            setData(result);
            setSearchData(result.products)
            setPriceMax(result.priceMax);
            setPriceMin(result.priceMin);
        }

        fetchData();
    }, []);
    const handlechangecategory = (event) => {
        var category = event.target.value;
        const newdatafilter = data.products.filter(product => product.category == category);
        if (newdatafilter.length > 0) {
            setSearchData(newdatafilter)
        } else {
            setSearchData(data.products)
        }

    }
    const handlechangebrowsecategory = (category) => {
        const newdatafilter = data.products.filter(product => product.category == category);
        if (newdatafilter.length > 0) {
            setSearchData(newdatafilter)
        } else {
            setSearchData(data.products)
        }

    }
    const handleSearch = (event) => {
        var currentpricemax = priceMax;
        var currentpricemin = priceMin
        var currentsearchterm = searchTerm

        console.log(authenticated);
        setAuthenticated(true);

        if (event.target.name === "pricemax") {
            setPriceMax(parseFloat(event.target.value));
            currentpricemax = parseFloat(event.target.value);
        }
        else if (event.target.name === "pricemin") {
            setPriceMin(parseFloat(event.target.value));
            currentpricemin = parseFloat(event.target.value)
        }
        else {
            setSearchTerm(event.target.value);
            currentsearchterm = event.target.value;
        }

        const results = data.products.filter(product => {
            if (event.target.value === "")
                return product;
            else if (product.name.toLowerCase().startsWith(currentsearchterm.toLowerCase()) === true &&
                product.price >= currentpricemin &&
                product.price <= currentpricemax)
                return product;
        });

        setSearchData(results);
        console.log(results);
    };

    function FilterMenuLeft() {
        return (
            <ul className="list-group list-group-flush rounded">
                <li className="list-group-item d-none d-lg-block">
                    <h5 className="mt-1 mb-2">Browse</h5>
                    <div className="d-flex flex-wrap my-2">
                        {data.categories.map((category, i) => {
                            return (
                                <Link
                                    key={i}
                                    to="/products"
                                    className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                                    replace
                                    onClick={() => handlechangebrowsecategory(category) }
                                >
                                    {category}
                                </Link>
                            );
                        })}
                    </div>
                </li>
                <li className="list-group-item">
                    <h5 className="mt-1 mb-2">Price Range</h5>
                    <div className="d-grid d-block mb-3">
                        <div className="form-floating mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Min"
                                defaultValue={priceMin}
                                name="pricemin"
                                onBlur={(event) => handleSearch(event)}
                            />
                            <label htmlFor="floatingInput">Min Price</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Max"
                                name="pricemax"
                                onBlur={(event) => handleSearch(event)}
                                defaultValue={priceMax}
                            />
                            <label htmlFor="floatingInput">Max Price</label>
                        </div>
                        <button className="btn btn-dark">Apply</button>
                    </div>
                </li>
            </ul>
        );
    }

    function changeViewType() {
        setViewType({
            grid: !viewType.grid,
        });
    }

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <ScrollToTopOnMount />
            <nav aria-label="breadcrumb" className="bg-custom-light rounded">
                <ol className="breadcrumb p-3 mb-0">
                    <li className="breadcrumb-item">
                        <Link
                            className="text-decoration-none link-secondary"
                            to="/products"
                            replace
                        >
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Products
                    </li>
                </ol>
            </nav>
            <div className="row mb-3 d-block d-lg-none">
                <div className="col-12">
                    <div id="accordionFilter" className="accordion shadow-sm">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button
                                    className="accordion-button fw-bold collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseFilter"
                                    aria-expanded="false"
                                    aria-controls="collapseFilter"
                                >
                                    Filter Products
                                </button>
                            </h2>
                        </div>
                        <div
                            id="collapseFilter"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFilter"
                        >
                            <div className="accordion-body p-0">
                                <FilterMenuLeft data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4 mt-lg-3">
                <div className="d-none d-lg-block col-lg-3">
                    <div className="border rounded shadow-sm">
                        <FilterMenuLeft data={data} />
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="d-flex flex-column h-100">
                        <div className="row mb-3">
                            <div className="col-lg-3 d-none d-lg-block">
                                <select onChange={(e) => handlechangecategory(e)}
                                    className="form-select"
                                    aria-label="Default select example"
                                    defaultValue=""
                                >
                                    <option value="">All Categories</option>
                                    {data.categories.map && data.categories.map((categoryname, i) => {
                                        return (<option value={categoryname}>{categoryname}</option>);
                                    })
                                    }
                                </select>
                            </div>
                            <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Search products..."
                                        aria-label="search input"
                                        onChange={e => handleSearch(e)}
                                        name="search"
                                    />
                                    <button className="btn btn-outline-dark">
                                        <FontAwesomeIcon icon={["fas", "search"]} />
                                    </button>
                                </div>
                                <button
                                    className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                                    onClick={changeViewType}
                                >
                                    <FontAwesomeIcon
                                        icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                                    />
                                </button>
                            </div>
                        </div>
                        <div
                            className={
                                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
                            }
                        >
                            {searchData && searchData.map((item, i) => {
                                if (viewType.grid) {
                                    return (
                                        <Product key={i} price={item.price} id={item.id} name={item.name} image={item.image} percentOff={i % 2 === 0 ? 15 : null} category={item.category} />
                                    );
                                }
                                return (
                                    <ProductH key={i} price={item.price} id={item.id} name={item.name} image={item.image} percentOff={i % 2 === 0 ? 15 : null} category={item.category} />
                                );
                            })}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
