import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import {  toast } from 'react-toastify';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";




export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  const style={
    layout: "horizontal",
    color: "blue",
    shape: "rect",
    label: "paypal",
    
    
   

    
  }
  return (
    <div>
      {console.log(data)}
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md" style={{justifyContent:"center",justifyItems:"center"}}>
        <table className="table table-hover ">
          <thead className="  fs-4" style={{color:"#43d4c1"}}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                {/* //onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /> */}
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                      onClick={()=>{
                        toast.success("Removed from cart!", {
                          position: toast.POSITION.TOP_CENTER,
                          
                      });
                      }}
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>{" "}
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-3">Total Price: Rs.{totalPrice}/-</h1>
        </div>
       
        <PayPalScriptProvider
          options={{
            "client-id":
              "AdSUMVxNBqPgdipvlo_SMe1v_BKB2IQV0oU4snoUPlMchHENLyGlTi4uuJGAPgzgWo8dLG9xhIP8kk3e",
          }}
        >
          <div style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
          <PayPalButtons
            style={style}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalPrice * 0.01,
                    },
                  },
                ],
              });
            }}
            onApprove={function (data, actions) {
              return actions.order.capture().then(async function () {
                let userEmail = localStorage.getItem("userEmail");
                // console.log(data,localStorage.getItem("userEmail"),new Date())
                let response = await fetch(
                  "http://localhost:5000/api/OrderData",
                  {
                    // credentials: 'include',
                    // Origin:"http://localhost:3000/login",
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      order_data: data,
                      email: userEmail,
                      order_date: new Date().toDateString(),
                    }),
                  }
                );
                //console.log("JSON RESPONSE:::::", response.status);
                if (response.status === 200) {
                  dispatch({ type: "DROP" });
                }
              });
            }
          }

            
          />
          </div>
        </PayPalScriptProvider>
       
        <div>
          
        </div>
      </div>
    </div>
  );
}
