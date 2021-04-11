
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { commerce } from './lib/commerce';
import React,{ useState,useEffect } from 'react';
import Home from './components/pages/Home';
import { Products, Navbar, Cart,Checkout } from './components';
function App() {
  const [products, setProducts]=useState([]);
  const [cart, setCart]=useState([]);
  const [order, setOrder] =useState({});
  const [errorMessage,setErrorMessage]=useState('');
  const fetchproducts = async ()=>{
      const {data} = await commerce.products.list();
      setProducts(data);
  }
  const fetchCarts = async ()=>{
      setCart(await commerce.cart.retrieve());
  }
  const handleAddToCart = async (productId,quantity) => {
      const { cart }  = await commerce.cart.add(productId,quantity);
      setCart(cart);
  }
  const handleUpdateCartQty = async (productId,quantity)=>{
      const { cart } = await commerce.cart.update(productId, {quantity});
      setCart(cart);
  }
  const removeFromCart = async(productId)=>{
      const { cart } = await commerce.cart.remove(productId);
      setCart(cart);
  }
  const refreshCart = async () =>{
      const newCart = await commerce.cart.empty();
      setCart(newCart);
  }
  const handleCaptureCheckout = async (checkoutTokenId, newOrder)=>{
      try{
          const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder);
          setOrder(incomingOrder);
          refreshCart();
      }catch(error){
          console.log("Error at a glance ", error)
          setErrorMessage(error.data.error.message);
      }
  }
  const handleEmptyCart = async()=>{
      const { cart } = await commerce.cart.empty();
      setCart(cart);
  }
  useEffect(()=>{
      fetchproducts();
      fetchCarts();
  },[]);
  return (
    <React.Fragment>
      <Router>
     <Navbar totalItems={cart.total_items}/>
     <Switch>
       <Route path="/" exact component={ Home }/>
       <Route exact path="/shop">
        <Products products={products} onAddToCart={handleAddToCart}/>
        </Route>
        <Route exact path="/cart">
                <Cart cart={ cart }
                    handleUpdateCartQty={handleUpdateCartQty}
                    removeFromCart={removeFromCart}
                    handleEmptyCart={handleEmptyCart}
                />
                </Route>
                <Route exact path="/checkout">
                    <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>
                </Route>
     </Switch>
     </Router>
    </React.Fragment>
  );
}

export default App;
