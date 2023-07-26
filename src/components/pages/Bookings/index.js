import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { fetchAPI, submitAPI } from '../../../utils/fakeAPI';
import pages from '../../../utils/pages';
import BookingForm from './BookingForm';
// Import AWS Amplify components and methods
import { API, Storage } from 'aws-amplify';
import createReservation from "../../../graphql/mutations"



const updateTimes = (availableTimes, date) => {
  const response = fetchAPI(new Date(date));
  return (response.length !== 0) ? response : availableTimes; 
};

const initializeTimes = initialAvailableTimes => 
  [...initialAvailableTimes, ...fetchAPI(new Date())];

const Bookings = () => {
  const [
    availableTimes, 
    dispatchOnDateChange
  ] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

// Update the submitData function to create the reservation and store it in S3
const submitData = async formData => {
  try {
    // Create a new reservation object to be sent to the API
    const newReservation = {
      name: formData.name,
      lastName: formData.lastName,
      cellphone: formData.cellphone,
      date: formData.date,
      time: formData.time,
      numberOfGuests: formData.numberOfGuests,
      occasion: formData.occasion,
    };

    // Use the GraphQL mutation to create the reservation in DynamoDB
    await API.graphql({ query: createReservation, variables: { input: newReservation } });

    // Reservation created successfully, now upload the reservation data to S3
    await Storage.put(`${formData.name}_${formData.lastName}_reservation.json`, JSON.stringify(newReservation));

    // Navigate to the confirmed booking page
    navigate(pages.get('confirmedBooking').path);

  } catch (error) {
    // Handle error (e.g., show error message)
    console.error('Error creating reservation:', error);
  }
};


  return (
    <div className="bookings">
      <h2>Table reservationx</h2>
      <BookingForm 
        availableTimes={availableTimes} 
        dispatchOnDateChange={dispatchOnDateChange} 
        submitData={submitData} 
      />
    </div>
  );
};

export default Bookings;
