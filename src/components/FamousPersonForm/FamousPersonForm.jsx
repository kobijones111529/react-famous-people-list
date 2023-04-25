import { useState } from "react";

function FamousPersonForm(props) {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');

  const addPerson = event => {
    event.preventDefault();

    props
      .addPerson({ name: famousPersonName, role: famousPersonRole })
      .then(() => {
        setPersonName('');
        setPersonRole('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={addPerson}>
      <label htmlFor="name-input">Name:</label>
      <input id="name-input" value={famousPersonName} onChange={e => setPersonName(e.target.value)} />
      <label htmlFor="role-input">Famous for:</label>
      <input id="role-input" value={famousPersonRole} onChange={e => setPersonRole(e.target.value)} />
      <button type="submit">Done</button>
    </form>
  );
}

export default FamousPersonForm;
