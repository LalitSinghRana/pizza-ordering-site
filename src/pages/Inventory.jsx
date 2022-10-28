import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import { PRODUCT_INVENTORY } from "../constants/constants";
import InventoryTable from "../components/InventoryTable";

const Inventory = ({ handleClick }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);

  const getPendingOrders = async () => {
    const res = await fetch(PRODUCT_INVENTORY, {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await res.json();
    let arr = [];
    for (let [key, val] of Object.entries(data.inventory[0])) {
      if (key !== "_id" && key !== "__v") {
        arr.push({
          title: key,
          dataArr: val,
        });
      }
    }

    setInventory((old) => [...arr]);
  };

  useEffect(() => {
    const myDecodedToken = decodeToken(token);

    if (!myDecodedToken || !myDecodedToken.isAdmin) {
      navigate("/login");
    } else {
      getPendingOrders();
    }
  }, []);

  return (
    <div className="bg-white grid items-center justify-items-center py-8 px-4">
      <button
        className="bg-yellow-300 text-black font-bold py-2 px-4 rounded-full"
        onClick={handleClick}
      >
        Toggle to Queue
      </button>
      {inventory.map((props, index) => (
        <InventoryTable key={index} {...props} />
      ))}
    </div>
  );
};

export default Inventory;
