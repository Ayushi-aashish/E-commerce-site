import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import  Message  from "../components/Message.js";
import  Loader  from "../components/Loader.js";
import Product from "../components/Product";
import {  listProducts } from "../actions/productActions";
const HomeScreen = () => {
    const dispatch = useDispatch();
        const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts());
        }, [dispatch]);
    

        return (
  <>
    <h1>Latest Products</h1>
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    )}
  </>
);
}
export default HomeScreen;