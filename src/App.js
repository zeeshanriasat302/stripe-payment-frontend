import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";

function App() {
  console.log("process.env.REACT_APP_STRIPE_SECRET_KEY --- ", process.env.REACT_APP_STRIPE_SECRET_KEY)
  const [product, setProduct] = useState({ 
    influencer_id: 3,
    brand_id: 1,
    package_id: 1, 
    content_type: "instagram",
    price: 10,
    productBy: "instagram"
  });

  const makePayment = (token) => {
    console.log('Token: ', token); // Log the token
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch(`http://localhost:5000/api/payment/stripeCheckout`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(
      response => {
        console.log("RESPONSE:  --->", response);
        const {status} = response;
        console.log("STATUS --->  ",status);
      }
    ).catch(error => console.log("error --> ", error))
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout 
          stripeKey={process.env.REACT_APP_STRIPE_SECRET_KEY}
          token={makePayment}
          name="By React"
          amount={product.price * 100}
        >
        <button className = "btn-large pink">Buy react in just {product.price}</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
