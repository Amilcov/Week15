import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { addCart, extractCart, removeCart} from '../../store/cart';

function CartItem({ item }) {
  const [count, setCount] = useState(item.count);

  const dispatch = useDispatch();

  useEffect(() => {
    setCount(item.count);
    console.log('Cart Item: effect ', item);
  }, [item.count]);

  return (
    <li className="cart-item">
      <div className="cart-item-header">
        {item.name}
      </div>
      <div className="cart-item-menu">
        <input
          type="number"
          value={count} />
        <button
          className="cart-item-button"
          onClick = {() => dispatch(addCart(item.id))}
        >
          +
        </button>
        <button
          className="cart-item-button" 
          onClick = {() => dispatch(extractCart(item.id))}
        >
          -
        </button>
        <button
          className="cart-item-button"
          onClick = {() => dispatch(removeCart(item.id))}
        >
          Remove
        </button>
      </div>
    </li>
  )
}

export default CartItem;