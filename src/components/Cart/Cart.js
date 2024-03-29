import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector } from 'react-redux';

const Cart = (props) => {
  const items = useSelector(state => state.cart.items)

  const cartItems = items.map(item => <CartItem
    key={item.id + Math.random() * 100}
    item={{
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      total: item.totalPrice,
      price: item.price
    }}
  />
  )

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {/* <CartItem
          item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
        /> */}
        {cartItems}
      </ul>
    </Card>
  );
};

export default Cart;
