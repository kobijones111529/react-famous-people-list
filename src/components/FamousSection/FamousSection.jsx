import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './FamousSection.css';
import FamousPersonForm from '../FamousPersonForm/FamousPersonForm';

function FamousSection() {
  let [famousPeopleArray, setPeopleArray] = useState([]);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: '/people'
      });
      setPeopleArray(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPerson = async person => {
    const response = await axios({
      method: 'POST',
      url: '/people',
      data: person
    });
    fetchPeople();
    return response;
  };

  return (
    <section className="new-person-section">
      <FamousPersonForm addPerson={addPerson} />
      <ul>
        {famousPeopleArray
          .map(person =>
            <li key={person.id}>{person.name} is famous for "{person.role}".</li>
          )}
      </ul>
    </section>
  );
}

export default FamousSection;
