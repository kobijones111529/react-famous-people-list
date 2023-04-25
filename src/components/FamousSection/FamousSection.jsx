import axios from 'axios'
import React, { useEffect, useState } from 'react';
import './FamousSection.css';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = () => {
    axios({
      method: 'GET',
      url: '/people'
    })
      .then(response => {
        setPeopleArray(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);

    axios({
      method: 'POST',
      url: '/people',
      data: { name: famousPersonName, role: famousPersonRole }
    })
      .then(() => {
        setPersonName('');
        setPersonRole('');
        fetchPeople();
      })
      .catch(error => {
        console.error(error);
      });
  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" value={famousPersonName} onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" value={famousPersonRole} onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
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
