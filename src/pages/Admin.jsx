import { useState } from "react";
import Queue from "./Queue";
import Inventory from "./Inventory";

const Admin = () => {
  const [flag, setFlag] = useState(true);

  const handleClick = () => setFlag(!flag);

  return (
    <>
      {flag ? (
        <Queue handleClick={handleClick} />
      ) : (
        <Inventory handleClick={handleClick} />
      )}
    </>
  );
};

export default Admin;
