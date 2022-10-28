import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import { ADMIN_GET_ORDERS, UPDATE_ORDER_STATUS } from "../constants/constants";
import Button from "../components/elements/Button";
import { ReactComponent as ArrowRightSvg } from "../assets/icons/arrow-right-long-svgrepo-com.svg";

const Queue = ({ handleClick }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const getPendingOrders = async () => {
    const res = await fetch(ADMIN_GET_ORDERS, {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await res.json();
    setOrders((old) => [...data.orders]);
  };

  useEffect(() => {
    const myDecodedToken = decodeToken(token);

    if (!myDecodedToken || !myDecodedToken.isAdmin) {
      navigate("/login");
    } else {
      getPendingOrders();
    }
  }, []);

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

  return (
    <div className="bg-white grid items-center justify-items-center py-8 px-4">
      <button
        className="bg-yellow-300 text-black font-bold py-2 px-4 rounded-full"
        onClick={handleClick}
      >
        Toggle to Inventory
      </button>
      <h1 className="p-8 text-xl">Queue</h1>
      <table className="table-auto items-center justify-items-center">
        <thead>
          <tr>
            <th className="border-collapse border border-slate-400 p-2">
              Order Id
            </th>
            <th className="border-collapse border border-slate-400 p-2">
              Order Status
            </th>
            <th className="border-collapse border border-slate-400 p-2">
              Take Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order._id}>
                <td className="border-collapse border border-slate-400 p-2">
                  {order._id}
                </td>
                <td className="border-collapse border border-slate-400 p-2">
                  {order.orderStatus}
                </td>
                <td className="border-collapse border border-slate-400 p-2">
                  <Button
                    variant="dark"
                    className="flex items-center"
                    onClick={() => updateOrderStatus(order)}
                  >
                    <span className="mr-1">Next</span>
                    <ArrowRightSvg />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Queue;
