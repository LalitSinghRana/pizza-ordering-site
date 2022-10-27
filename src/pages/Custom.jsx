import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import { INVENTORY, UPDATE_ORDER_STATUS } from "../constants/constants";
import Button from "../components/elements/Button";
import { ReactComponent as ArrowRightSvg } from "../assets/icons/arrow-right-long-svgrepo-com.svg";

const Custom = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [inventory, setInventory] = useState({});

  const getPendingOrders = async () => {
    const res = await fetch(INVENTORY, {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await res.json();
    setInventory(data.inventory[0]);
  };

  useEffect(() => {
    getPendingOrders();
  }, []);

  useEffect(() => {
    console.log(inventory);

    if (inventory.base) {
      let select = document.getElementById("selectBase");

      inventory.base.forEach((x) => {
        let el = document.createElement("option");
        el.textContent = x.type;
        el.value = x.type;
        select.appendChild(el);
      });
    }

    if (inventory.sauce) {
      let select = document.getElementById("selectSauce");

      inventory.sauce.forEach((x) => {
        let el = document.createElement("option");
        el.textContent = x.type;
        el.value = x.type;
        select.appendChild(el);
      });
    }

    if (inventory.cheese) {
      let select = document.getElementById("selectCheese");

      inventory.cheese.forEach((x) => {
        let el = document.createElement("option");
        el.textContent = x.type;
        el.value = x.type;
        select.appendChild(el);
      });
    }
  }, [inventory]);

  const updateOrderStatus = async (order) => {
    await fetch(UPDATE_ORDER_STATUS, {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: order,
      }),
    });

    getPendingOrders();
  };

  const handleClick = () => {
    console.log(inventory);
  };

  return (
    <div className="bg-white grid items-center justify-items-center py-8 px-4">
      <button
        className="bg-yellow-300 text-black font-bold py-2 px-4 rounded-full"
        onClick={() => handleClick()}
      >
        Toggle to Inventory
      </button>
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
    </div>
  );
};

export default Custom;
