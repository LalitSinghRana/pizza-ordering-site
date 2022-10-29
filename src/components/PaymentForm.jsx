import { useSelector } from "react-redux";
import { cartProducts } from "../stores/cart/cartSlice";
import { getAddress } from "../stores/userInfo/addressSlice";
import Button from "./elements/Button";
import { PLACE_ORDER } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../stores/cart/cartSlice";
import { useDispatch } from "react-redux";

export const PaymentForm = () => {
  const cart = useSelector(cartProducts);
  const address = useSelector(getAddress);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const placeOrder = async (event) => {
    event.preventDefault();
    try {
      // console.log("place order :", cart);

      const res = await fetch(PLACE_ORDER, {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodType: "card",
          orderItems: cart,
          shippingAddress: address,
        }),
      });

      const data = await res.json();

      if (data.status === "ok") {
        alert("Order placed...");
        dispatch(clearCart());
        navigate("/");
      } else throw new Error(data.error);
    } catch (error) {
      console.log(error);
      alert("Failed to place order...");
    }
  };

  return (
    <form className="md:-2/3 md:mx-auto px-2 pt-1" id="payment-form">
      <div className="flex justify-center p-2">
        <Button type="submit" onClick={placeOrder}>
          Pay Now
        </Button>
      </div>
    </form>
  );
};
