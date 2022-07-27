import useInput from "../hooks/input-hook";
import { Form, Button } from "react-bootstrap";
const isNotEmpty = (value) => value.trim() !== "";

const Search = ({ setInputValue }) => {
  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (usernameIsValid) {
    formIsValid = true;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (usernameIsValid) {
      setInputValue(username);
    } else alert(" Name can be empty");
  };
  return (
    <section className="search-area">
      <div>
        <h2 className="mb-4">Github Username Search</h2>
        <Form onSubmit={handleFormSubmit}>
          {/* Username Field*/}

          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
              placeholder="Enter a Github username"
            />
            {usernameHasError && <p className="error-text">Enter a username</p>}
          </Form.Group>

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            onClick={handleFormSubmit}
            disabled={!formIsValid}
            className="mb-3"
          >
            Search
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default Search;
