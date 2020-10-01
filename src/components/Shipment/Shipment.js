import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const onSubmit = data => {
        console.log('from submit', data)
    };

    // console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form className="ship-from" onSubmit={handleSubmit(onSubmit)}>
            <input name="Name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name"/>
            {errors.Name && <span className="error">Name is required</span>}
            
            <input name="Email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email"/>
            {errors.Email && <span className="error">Email is required</span>}

            <input name="Address" ref={register({ required: true })} placeholder="Your Address"/>
            {errors.Address && <span className="error">Address is required</span>}

            <input name="Phone" defaultValue={loggedInUser.phoneNumber} ref={register({ required: true })} placeholder="Your Phone Number"/>
            {errors.Phone && <span className="error">Phone is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;