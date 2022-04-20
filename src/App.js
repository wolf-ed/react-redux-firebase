import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Notification from './components/UI/Notification';

import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;//this only runs the first time we open the app,
/*
because its outside of the component, so each time the component renders
it wont run
*/


function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);

  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return
    } /*
    by doing this we don't send the cart request the first time our app runs(since
      it's not necesary to send it the first time the app runs)
    */
    if (cart.changed) {
      dispatch(sendCartData(cart))
    }

  }, [cart, dispatch])//we can safely add dispatch here because react will ensure that
  //this is a function that will never change

  return (
    <Fragment>
      {notification && <Notification status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
