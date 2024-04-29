/* eslint-disable react/prop-types */
const AddForm = ({
  handleAddPerson,
  newName,
  newNumber,
  handleInputChange
}) => {
  return (
    <form>
      <div>
        name: <input name="name" value={newName} onChange={handleInputChange} />
      </div>
      <div>
        number:{" "}
        <input name="number" value={newNumber} onChange={handleInputChange} />
      </div>
      <div>
        <button type="submit" onClick={handleAddPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default AddForm;
