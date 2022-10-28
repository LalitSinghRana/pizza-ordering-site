import { useState, useEffect } from "react";
import { PRODUCT_INVENTORY, CUSTOM_PRODUCT_URL } from "../constants/constants";
import { addToCart } from "../stores/cart/cartSlice";
import { useDispatch } from "react-redux";

const Custom = () => {
  const token = localStorage.getItem("token");
  const [inventory, setInventory] = useState({});
  const [customProduct, setCustomProduct] = useState({});
  const dispatch = useDispatch();

  const getInventory = async () => {
    const res = await fetch(PRODUCT_INVENTORY, {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await res.json();
    setInventory(data.inventory[0]);
  };

  const getCustomProduct = async () => {
    const res = await fetch(CUSTOM_PRODUCT_URL, {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await res.json();
    // console.log(data.data[0]);
    setCustomProduct(data.data[0]);
  };

  useEffect(() => {
    getInventory();
    getCustomProduct();
  }, []);

  useEffect(() => {
    // console.log(inventory);

    if (inventory.base) {
      let select = document.getElementById("selectBase");

      inventory.base.forEach((x) => {
        let el = document.createElement("option");
        el.textContent = x.type;
        el.value = JSON.stringify(x);
        select.appendChild(el);
      });
    }

    if (inventory.sauce) {
      let select = document.getElementById("selectSauce");

      inventory.sauce.forEach((x) => {
        let el = document.createElement("option");
        el.textContent = x.type;
        el.value = JSON.stringify(x);
        select.appendChild(el);
      });
    }

    if (inventory.cheese) {
      let select = document.getElementById("selectCheese");

      inventory.cheese.forEach((x) => {
        let el = document.createElement("option");
        el.textContent = x.type;
        el.value = JSON.stringify(x);
        select.appendChild(el);
      });
    }
  }, [inventory]);

  const handleClick = () => {
    let baseVal = JSON.parse(document.getElementById("selectBase").value);

    let sauceVal = JSON.parse(document.getElementById("selectBase").value);
    let cheeseVal = JSON.parse(document.getElementById("selectBase").value);

    const customPizza = {
      ...customProduct,
      price: baseVal.price + sauceVal.price + cheeseVal.price,
    };

    dispatch(addToCart(customPizza));
    alert("Your custom Pizza added to cart");
  };

  return (
    <div className="bg-white grid items-center justify-items-center py-8 px-4">
      <h1 className="p-8 text-xl">Make your pizza...</h1>
      <div className="w-full grid items-center justify-items-center">
        <div>
          <label className="">Select base</label>
          <select id="selectBase"></select>
        </div>
        <div>
          <label className="">Select sauce</label>
          <select id="selectSauce"></select>
        </div>
        <div>
          <label className="">Select cheese</label>
          <select id="selectCheese"></select>
        </div>
      </div>
      <button
        className="bg-yellow-300 text-black font-bold py-2 px-4 rounded-full"
        onClick={() => handleClick()}
      >
        Add to cart
      </button>
    </div>
  );
};

export default Custom;
