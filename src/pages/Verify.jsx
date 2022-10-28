import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { VERIFY_USER } from "../constants/constants";

const Verify = () => {
  const [varified, setVarified] = useState(false);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = VERIFY_USER.replace(":userId", param.userId).replace(
          ":token",
          param.token
        );

        await fetch(url);
        setVarified(true);
      } catch (error) {
        console.log(error);
      }
    };

    verifyEmailUrl();
  }, []);

  return (
    <div className="bg-white grid items-center justify-items-center py-8 px-4">
      {varified ? (
        <h1 className="p-8 text-xl">Successfully Verified</h1>
      ) : (
        <h1 className="p-8 text-xl">Verifying</h1>
      )}
    </div>
  );
};

export default Verify;
