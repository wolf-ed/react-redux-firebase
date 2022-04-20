import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {/* async because 
        here we are going to use fetch and also
        we will wrap fetchData() with try and catch */
            const response = await fetch(`https://react-http-911bf-default-rtdb.europe-west1.firebasedatabase.app/cart.json`)

            if (!response.ok) {
                throw new Error('Could not fetch cart data');
            }

            const data = response.json()
            return data
        };//end of fetchData

        try {
            const cartData = await fetchData()
            console.log(cartData)
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))/* by replacing "cartData" for this object with items and totalQuantity we prevent cartData
            from being undefined if it doesnt contain anything, we don't want that because that would break our app */
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error',
                    message: 'Sending cart data failed'
                }))//end of disptach
        }

    }//End of disptach
};//end of fetchCartData

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data'
        })
        );

        const sendRequest = async () => {
            const response = await fetch(`https://react-http-911bf-default-rtdb.europe-west1.firebasedatabase.app/cart.json`, {
                method: 'PUT',  //it will override existing data
                // body: JSON.stringify(cart),
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                }),/* this way we create a new object which does not contain "changed" */

            })//end of response

            if (!response.ok) {
                throw new Error('Sending cart data failed.')
            }//end of if
        };//end of sendRequest

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Sent cart data successfully'
            }))//end of dispatch
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error',
                    message: 'Sending cart data failed'
                })
            )//end of dispatch
        }//end of catch





    };//end of return function
} //end of sendCartData




