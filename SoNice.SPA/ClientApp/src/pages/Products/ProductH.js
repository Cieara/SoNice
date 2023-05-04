
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import SoNiceContext from "../../SoNiceContext";


function ProductH(props) {

  const { setShoppingBasket } = useContext(SoNiceContext);
  const {shoppingBasket} = useContext(SoNiceContext);


  const price = props.price;
  let percentOff = props.percentOff;
  let offPrice = `£${price}`;
  let name = props.name;  
  let route = "/productdetail/" + props.id;

  const handleAddToCart=(e)=>
  {
      let currentshoppingbasket = shoppingBasket;
      let newitem={
        name:name,
        price:price,
        id:props.id,
        image:props.image
      }
      currentshoppingbasket.push(newitem);
      setShoppingBasket(currentshoppingbasket);
  }

  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", left: "0.5rem" }}
      >
        {props.percentOff}% OFF
      </div>
    );

    offPrice = (
      <>
        <del>£{price}</del> £{price - (props.percentOff * price) / 100}
      </>
    );
  }
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-4">
            <Link to={route} href="!#" replace>
              {percentOff}
              <img
                className="card-img-top bg-dark cover"
                height="200"
                alt=""
                src={`data:image/jpg;base64,${props.image}`}
              />
            </Link>
          </div>
          <div className="col-8">
            <div className="card-body h-100">
              <div className="d-flex flex-column h-100">
                <h5 className="card-title text-dark text-truncate mb-1">
                  {name}
                </h5>
                <span className="card-text text-muted mb-2 flex-shrink-0">
                  {offPrice}
                </span>
                <div className="mt-auto d-flex">
                  <button className="btn btn-outline-dark ms-auto" onClick={(e)=>handleAddToCart(e)}>
                    <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductH;
