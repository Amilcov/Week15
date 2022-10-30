import { useDispatch, useSelector } from "react-redux";
import { likedProduce } from "../../store/produce";
import { addCart } from "../../store/cart";
import { useEffect } from "react";


function ProduceDetails({ produce }) {
  const cartItem = useSelector(state => state.cart);
  const dispatch = useDispatch();


  function showChart() {
    document.getElementsByTagName('main')[0].style = 'marginRight: 300px';
    document.getElementsByClassName('sidebar')[0].style =  'transform: translateX(-100%)';
  }


  return (
    <li className="produce-details">
      <span>{produce.name}</span>
      <span>
        <button
          className={"like-button" + (produce.liked ? " selected" : "")}
          onClick={() => dispatch(likedProduce(produce.id))}
        >
          <i className={"fas fa-heart"} />
        </button>
        <button
          className={"plus-button" + (cartItem ? " selected" : "")}
          onClick={() => { dispatch(addCart(produce.id))
                           showChart();
                         }
          }
        >
          <i className="fas fa-plus" />
        </button>
      </span>
    </li>
  );
}

export default ProduceDetails;