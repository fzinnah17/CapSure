const APIForm = ({ inputs, handleChange, onSubmit, inputsInfo }) => {
    return (
      <div>
        <h2>Select Your Image Attributes:</h2>
        <form className="form-container">
        <ul>
          {Object.entries(inputs).map(([category, value], index) => (
            <li className="form" key={index}>
              <h2>{category}</h2>
              <input
                type="text"
                name={category}
                value={value}
                placeholder="Input this attribute..."
                onChange={handleChange}
                className="textbox"
              />
              <p>{inputsInfo[index]}</p>
            </li>
          ))}
          </ul>
          <button type="button" className="button" onClick={onSubmit} disabled={!inputs.url}>
            Take that Pic! 🎞
          </button>
        </form>
      </div>
    );
  };
  
  export default APIForm;
  