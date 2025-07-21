const PersonForm = ({
  addPerson,
  name,
  handleNameChange,
  number,
  handleNumberChange,
}) => (
  <form onSubmit={addPerson}>
    <Input text="name:" onChange={handleNameChange} value={name} />
    <Input text="number:" onChange={handleNumberChange} value={number} />
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Input = ({ text, onChange, value }) => (
  <div>
    {text} <input onChange={onChange} value={value} />
  </div>
);

export default PersonForm;
