import { useState } from 'react';
import './App.css';
import Axios from 'axios'
import axios from 'axios';

function App() {

  const [ name, setName] = useState("");

  const [ address, setAddress] = useState("");
  const [ product, setProduct] = useState("");
  const [ price, setPrice] = useState(0);
  const [ quantity, setQuantity] = useState(0);

  const [orderList, setOrderList] = useState([]);

  const displayInfo = () => {
    console.log( name + address + product + price + quantity );
  }

  const addOrder = () => {
    Axios.post('http://localhost:3001/api/createOrder', { 
      name:name, 
      address:address, 
      product:product, 
      price:price,
      quantity:quantity
    }).then(() => {
      // console.log( "success");

      setOrderList([...orderList, { 
        name:name, 
        address:address, 
        product:product, 
        price:price,
        quantity:quantity
      }])
    })
  }

  const getOrders = () => {
    Axios.get('http://localhost:3001/orders').then((response) => {
      console.log(  response);
      setOrderList(response.data);
    })
  }
  return (
    <div className="App">
      <div className="information">
        <label>Name</label>
        <input type="text" onChange={(event) => {setName(event.target.value)}}/>
        <label>Mailing Address</label>
        <input type="text" onChange={(event) => {setAddress(event.target.value)}}/>
      
       
        <label>Product</label>
        <input type="text" onChange={(event) => {setProduct(event.target.value)}}/>
        <label>Quantity</label>
        <input type="number" onChange={(event) => {setQuantity(event.target.value)}}/>
        <label>Price</label>
        <input type="number" onChange={(event) => {setPrice(event.target.value)}}/>
        <button onClick={addOrder}>Add Order</button>
      </div>

      <div className="orders">

      <button onClick={getOrders}>Show Orders</button>
      {
        orderList.map((val, key) => {
          return <div className="order">
            <h3>Name : {val.name}</h3>
            <h3>Address : {val.address}</h3>
            <h3>Product: {val.product}</h3>
            <h3>Quantity: {val.quantity}</h3>
            <h3>Price : {val.price}</h3>
            </div>
        })
      }
      </div>
    </div>
  );
}

export default App;
