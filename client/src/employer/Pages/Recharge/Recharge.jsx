import React, { useEffect, useState } from "react";
import { getValue, getWalletPoints, rechargeWallet } from "../../functions";

const Recharge = () => {
  const [costOfOne, setcostOfOne] = useState();
  const [points, setpoints] = useState(0);
  const [walletPoints, setwalletPoints] = useState(0);
  // const VALUE_OF_ONE_POINT = getValue();
  const [VALUE_OF_ONE_POINT, setVALUE_OF_ONE_POINT] = useState(0);

  const populate = async () => {
    const wallet = await getWalletPoints(localStorage.getItem("token"));
    // console.log(wallet);
    setwalletPoints(wallet.balance);
    const value = await getValue();
    console.log(value);
    console.log(value.$numberDecimal);
    setVALUE_OF_ONE_POINT(value.$numberDecimal);
  };
  useEffect(() => {
    populate();
  }, []);

  return (
    <div className="company">
      <h2 className="company-text">Your wallet Balance : {walletPoints}</h2>

      <div className="companyItem">
        <div className="addEmployer">
          <div className="form-item">
            <input
              value={points}
              className="input-aria1"
              onChange={(e) => {
                setpoints(e.target.value);
              }}
              placeholder="Enter Points"
              type="number"
            />
          </div>
         
          {points == 0 ? (
            <span> </span>
          ) : (
            <span>
              Cost in Rupees : {Math.round(VALUE_OF_ONE_POINT * points)}
            </span>
          )}
        <div className="form-item">
          <button
            
            onClick={(e) =>
              rechargeWallet(localStorage.getItem("token"), points)
            }
          >
            Recharge
          </button>
          </div>
          <div className="rechargeOptions">
            <button
              onClick={async (e) => {
                await rechargeWallet(localStorage.getItem("token"), 100);
                window.location.reload();
              }}
            >
              Recharge 100 Points
            </button>
            <button
              onClick={async (e) => {
                await rechargeWallet(localStorage.getItem("token"), 250);
                window.location.reload();
              }}
            >
              Recharge 250 Points
            </button>
            <button
              onClick={async (e) => {
                await rechargeWallet(localStorage.getItem("token"), 500);
                window.location.reload();
              }}
            >
              Recharge 500 Points
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;