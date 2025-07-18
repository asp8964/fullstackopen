const Filter = ({ filterName, handleFilterChange }) => {
  return (
    <p>
      filter shown with
      <input onChange={handleFilterChange} value={filterName} />
    </p>
  );
};

export default Filter;
