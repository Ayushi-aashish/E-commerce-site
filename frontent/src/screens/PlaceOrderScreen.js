import React,{useState,useEffect} from 'react'
import {Row ,Col,Card,ListGroup,Button,Image} from 'react-bootstrap'
import {useDispatch,useSelector} from "react-redux"
import Message from '../components/Message.js'
import { CheckoutSteps } from '../components/CheckoutSteps.js'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import  {createOrder} from '../actions/orderActions.js'



const PlaceOrderScreen = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
// Calculate prices
const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const shippingPrice = itemsPrice > 100 ? 0 : 10;
const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

// Assign calculated prices to cart (if needed)
cart.itemsPrice = itemsPrice.toFixed(2);
cart.shippingPrice = shippingPrice.toFixed(2);
cart.taxPrice = taxPrice;
cart.totalPrice = totalPrice;

useEffect(() => {
  if (!cart.shippingAddress?.address) {
    navigate('/shipping');
  } else if (!cart.paymentMethod) {
    navigate('/payment');
  }
}, [cart, navigate]);

const orderCreate=useSelector(state=>state.orderCreate)
const {order,success,error} =orderCreate
useEffect(() => {
  console.log("🎯 useEffect running. Success:", success, "Order:", order);

  if (success) {
    navigate(`/order/${order._id}`);
  }
}, [navigate, success, order]);

 // const dispatch = useDispatch();
 const placeOrderHandler = () => {
  console.log("📦 Place Order button clicked");

  const orderItems = cart.cartItems.map((item, i) => {
    const productId = item.product || item._id || item.id;

    if (!productId) {
      console.warn(`❌ Item ${i} is missing product ID:`, item);
    }

    return {
      name: item.name,
      image: item.image,
      price: item.price,
      product: productId,
      qty: item.quantity || item.qty,
    };
  });

  const orderPayload = {
    orderItems,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice,
  };

  console.log("🚀 Dispatching createOrder now...");
  dispatch(createOrder(orderPayload));
};

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
  <strong>Address:</strong>
  {cart.shippingAddress?.address}, {cart.shippingAddress?.city}{' '}
  {cart.shippingAddress?.postalCode}, {cart.shippingAddress?.country}
</p>

            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${Number(item.price).toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}

                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
             
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                
  

          
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default PlaceOrderScreen;