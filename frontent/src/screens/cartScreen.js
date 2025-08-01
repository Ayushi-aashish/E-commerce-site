import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row,Col,ListGroup,Image,Form,Button,Card } from 'react-bootstrap';
import { addToCart,removeFromCart } from '../actions/cartActions.js';
import Message from '../components/Message.js';
import {Link} from 'react-router-dom';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const CartScreen = () => {
  const { id: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const qty = Number(new URLSearchParams(location.search).get('qty')) || 1;


 
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id, 0));
       // navigate('/cart');
    }
    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
        // navigate('/shipping'); // Redirect to shipping screen
    }
    return (<Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message>
                    Your cart is empty <Link to="/">Go Back</Link> 
                    </Message>
            ) : ( <ListGroup variant="flush">
                {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>${item.price}</Col>
                            <Col md={2}>
                                <Form.Control
                                    as="select"
                                    value={item.qty}
                                    onChange={(e) =>
                                        dispatch(
                                            addToCart(item.product, Number(e.target.value))
                                        )
                                    }
                                >
                                   
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x+1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button
                                    type="button"
                                    variant="light"
                                    onClick={() =>
                                        removeFromCartHandler(item.product)

                                    }
                                >
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>)}

</Col>
<Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
                        </h2>
                        $
                        {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                            type="button"
                            className="btn-block"
                            disabled={cartItems.length === 0}
                            onClick={() => {checkoutHandler()}}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
</Col>

            
    </Row>);
            }
export default CartScreen;
    
