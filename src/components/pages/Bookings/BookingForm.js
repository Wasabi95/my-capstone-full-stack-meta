import { useState } from 'react';
import FormField from './FormField';



const BookingForm = ({
  availableTimes,
  dispatchOnDateChange,
  submitData
}) => {
  const minimumDate = new Date().toISOString().split('T')[0];
  const defaultTime = availableTimes[0];
  const minimumNumberOfGuests = 1;
  const maximumNumberOfGuests = 10;
  const occasions = ['Birthday', 'Anniversary'];
  const invalidDateErrorMessage = 'Please choose a valid date';
  const invalidTimeErrorMessage = 'Please choose a valid time';
  const invalidOccasionErrorMessage = 'Please choose a valid occasion';
  const invalidNumberOfGuestsErrorMessage = 
    'Please enter a number between 1 and 10';
    const invalidNameErrorMessage = 'Please enter your name';
    const invalidLastNameErrorMessage = 'Please enter your last name';
    const invalidCellphoneErrorMessage = 'Please enter a valid cellphone number';
  
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cellphone, setCellphone] = useState('');
  const [date, setDate] = useState(minimumDate);
  const [time, setTime] = useState(defaultTime);
  const [
    numberOfGuests, 
    setNumberGuests
  ] = useState(minimumNumberOfGuests);
  const [occasion, setOccasion] = useState(occasions[0]);

  const isDateValid = () => date !== '';
  const isTimeValid = () => time !== '';
  const isNumberOfGuestsValid = () => numberOfGuests !== '';
  const isOccasionValid = () => occasion !== '';
  const isNameValid = () => name !== '';
  const isLastNameValid = () => lastName !== '';
  const isCellphoneValid = () => /^\d{10}$/.test(cellphone); // Validating a 10-digit cellphone number
  // Rest of the existing validation functions (isDateValid, isTimeValid, isNumberOfGuestsValid, isOccasionValid)


  const areAllFieldsValid = () =>
  isNameValid() &&
  isLastNameValid() &&
  isCellphoneValid() &&
  isDateValid() &&
  isTimeValid() &&
  isNumberOfGuestsValid() &&
  isOccasionValid();
  
  const handleDateChange = e => {
    setDate(e.target.value);
    dispatchOnDateChange(e.target.value);
  };

  const handleTimeChange = e => setTime(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitData({
      name,
      lastName,
      cellphone,
      date,
      time,
      numberOfGuests,
      occasion,
    });
  };

 

  return (
    <form onSubmit={handleFormSubmit}>
      {/* New fields for name, last name, and cellphone number */}
      <FormField
        label="Name"
        htmlFor="booking-name"
        hasError={!isNameValid()}
        errorMessage={invalidNameErrorMessage}
      >
        <input
          type="text"
          id="booking-name"
          name="booking-name"
          value={name}
          required={true}
          onChange={(e) => setName(e.target.value)}
        />
      </FormField>
      <FormField
        label="Last Name"
        htmlFor="booking-last-name"
        hasError={!isLastNameValid()}
        errorMessage={invalidLastNameErrorMessage}
      >
        <input
          type="text"
          id="booking-last-name"
          name="booking-last-name"
          value={lastName}
          required={true}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormField>
      <FormField
        label="Cellphone Number"
        htmlFor="booking-cellphone"
        hasError={!isCellphoneValid()}
        errorMessage={invalidCellphoneErrorMessage}
      >
        <input
          type="text"
          id="booking-cellphone"
          name="booking-cellphone"
          value={cellphone}
          required={true}
          onChange={(e) => setCellphone(e.target.value)}
        />
      </FormField>
    
      <FormField 
        label="Date" 
        htmlFor="booking-date" 
        hasError={!isDateValid()} 
        errorMessage={invalidDateErrorMessage}
      >
        <input 
          type="date" 
          id="booking-date" 
          name="booking-date" 
          min={minimumDate} 
          value={date} 
          required={true} 
          onChange={handleDateChange}
        />
      </FormField>
      <FormField 
        label="Time" 
        htmlFor="booking-time" 
        hasError={!isTimeValid()} 
        errorMessage={invalidTimeErrorMessage}
      >
        <select 
          id="booking-time" 
          name="booking-time" 
          value={time} 
          required={true} 
          onChange={handleTimeChange}
        >
          {availableTimes.map(times => 
            <option data-testid="booking-time-option" key={times}>
              {times}
            </option>
          )}
        </select>
      </FormField>
      <FormField 
        label="Number of guests" 
        htmlFor="booking-number-guests" 
        hasError={!isNumberOfGuestsValid()} 
        errorMessage={invalidNumberOfGuestsErrorMessage}
      >
        <input 
          type="number" 
          id="booking-number-guests" 
          name="booking-number-guests" 
          value={numberOfGuests} 
          min={minimumNumberOfGuests} 
          max={maximumNumberOfGuests} 
          required={true} 
          onChange={e => setNumberGuests(e.target.value)}
        />
      </FormField>
      <FormField 
        label="Occasion" 
        htmlFor="booking-occasion" 
        hasError={!isOccasionValid()} 
        errorMessage={invalidOccasionErrorMessage}
      >
        <select 
          id="booking-occasion" 
          name="booking-occasion" 
          value={occasion} 
          required={true} 
          onChange={e => setOccasion(e.target.value)}
        >
          {occasions.map(occasion => 
            <option data-testid="booking-occasion-option" key={occasion}>
              {occasion}
            </option>
          )}
        </select>
      </FormField>
      <button 
        className="button-primary" 
        type="submit" 
        disabled={!areAllFieldsValid()}
      >
        Make your reservation
      </button>
    </form>
  );
};

export default BookingForm;
