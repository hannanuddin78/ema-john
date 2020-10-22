import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const onSubmit = (data) => {
    const saveCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      shipment: data,
      products: saveCart,
      orderTime: new Date(),
    };
    fetch("https://safe-harbor-53165.herokuapp.com/orderDetails", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          processOrder();
          alert("your order submit successful");
        }
      });
  };

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-from" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="Name"
        defaultValue={loggedInUser.name}
        ref={register({ required: true })}
        placeholder="Your Name"
      />
      {errors.Name && <span className="error">Name is required</span>}

      <input
        name="Email"
        defaultValue={loggedInUser.email}
        ref={register({ required: true })}
        placeholder="Your Email"
      />
      {errors.Email && <span className="error">Email is required</span>}

      <input
        name="Address"
        ref={register({ required: true })}
        placeholder="Your Address"
      />
      {errors.Address && <span className="error">Address is required</span>}

      <input
        name="Phone"
        defaultValue={loggedInUser.phoneNumber}
        ref={register({ required: true })}
        placeholder="Your Phone Number"
      />
      {errors.Phone && <span className="error">Phone is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
