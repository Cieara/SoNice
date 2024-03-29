import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SoNiceContext from "../../SoNiceContext";
import { useContext } from "react";

function Product(props) {

  const { setShoppingBasket } = useContext(SoNiceContext);
  const {shoppingBasket} = useContext(SoNiceContext);

  const price = props.price;
  let percentOff = props.percentOff;
  let offPrice = `£${price}`;
  let route = "/productdetail/" + props.id;
  let name = props.name; 
  let category = props.category;


  const handleAddToCart=(e)=>
  {
      let currentshoppingbasket = shoppingBasket;
      let newitem={
        name:name,
        price:price,
        id:props.id,
        image:props.image,
        category:category

      }
      currentshoppingbasket.push(newitem);
      setShoppingBasket(currentshoppingbasket);
  }

  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", right: "0.5rem" }}
      >
        {props.percentOff}% OFF
      </div>
    );

    offPrice = (
      <>
        £{price - (props.percentOff * price) / 100}
      </>
    );
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={route} href="!#" replace>
          {percentOff}
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt=""
            src={`data:image/jpg;base64,${props.image}`}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {name}        
          </h5>
          <p className="card-text text-center text-muted mb-0">{offPrice}</p>
          <div className="d-grid d-block">
            <button className="btn btn-outline-dark mt-3" onClick={(e)=>handleAddToCart(e)}>
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
