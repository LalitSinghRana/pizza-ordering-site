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
    const baseVal = JSON.parse(document.getElementById("selectBase").value);

    const sauceVal = JSON.parse(document.getElementById("selectSauce").value);
    const cheeseVal = JSON.parse(document.getElementById("selectCheese").value);

    const customPizza = {
      ...customProduct,
      price: baseVal.price + sauceVal.price + cheeseVal.price,
      base: baseVal._id,
      sauce: sauceVal._id,
      cheese: cheeseVal._id,
    };

    dispatch(addToCart(customPizza));
    alert("Your custom Pizza added to cart");
  };

  return (
    <div className="bg-white grid items-center justify-items-center py-8 px-4">
      <h1 className="p-8 text-xl font-bold">Make your pizza...</h1>
      <div className="w-full grid items-center justify-items-center">
        <div className="w-9/12 flex m-2 border-2 px-8 py-2 ">
          <label className="grow">Select base</label>
          <select
            className="grow py-1 block py-2 px-4 bg-gray-200"
            id="selectBase"
          ></select>
        </div>
        <div className="w-9/12 flex m-2 border-2 px-8 py-2">
          <label className="grow">Select sauce</label>
          <select
            className="grow py-1 block py-2 px-4 bg-gray-200"
            id="selectSauce"
          ></select>
        </div>
        <div className="w-9/12 flex m-2 border-2 px-8 py-2">
          <label className="grow">Select cheese</label>
          <select
            className="grow py-1 block py-2 px-4 bg-gray-200"
            id="selectCheese"
          ></select>
        </div>
      </div>
      <button
        className="bg-yellow-300 text-black font-bold py-4 px-8 m-8 rounded-full"
        onClick={() => handleClick()}
      >
        Add to cart
      </button>
    </div>
  );
};

export default Custom;
