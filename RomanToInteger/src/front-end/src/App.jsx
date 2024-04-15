import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateRoman, setUpdateRoman] = useState('');
  const [result, setResult] = useState('');
  const [result2, setResult2] = useState('');
  const [resultUpdated, setResultUpdated] = useState('');

  const handlePost = async (event) => {
    event.preventDefault();
    const data = {
      roman: inputValue
    };
    try {
      const response = await fetch("http://localhost:8080/roman", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      setResult(`id: ${responseData.id}, roman: ${responseData.roman}, conversion: ${responseData.conversion}`);
      setInputValue('');
      setResult2('');
      setResultUpdated('');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGet = async (event) => {
    event.preventDefault();
    const id = event.target.elements.id.value;
    const url = `http://localhost:8080/roman/${id}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResult(`id: ${data.id}, roman: ${data.roman}, conversion: ${data.conversion}`);
      setResult2('');
      setResultUpdated('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const id = event.target.elements['id-delete'].value;
    const url = `http://localhost:8080/roman/${id}/delete`;

    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
      const data = await response.json();
      setResult2(`Deleted data with id: ${data.id}`);
      setResult('');
      setResultUpdated('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const id = parseInt(updateId, 10);

    if (isNaN(id)) {
      alert('Please enter a valid number.');
      return;
    }

    const url = `http://localhost:8080/roman/${id}/update`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, roman: updateRoman })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setResultUpdated(`id: ${data.id}, roman: ${data.roman}, conversion: ${data.conversion}`);
      setResult('');
      setResult2('');
      setUpdateId('');
      setUpdateRoman('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="gx-5">
        <div className="btn-group w-100" role="group">
          <button className="btn btn-primary">Home</button>
          <button className="btn btn-secondary">Roman</button>
          <button className="btn btn-primary">Number</button>
        </div>

        <div className="container text-center">
          <div className="p-3">
            <img src="../images/roman-number-table.webp" alt="roman to number" className="img-fluid" />
          </div>
        </div>

        <div className="container row">
          <div className="col-12 col-md-6  mb-2">
            <form onSubmit={handlePost} className="form-inline mb-2">
              <fieldset>
                <legend className="h6">Calculate</legend>
                <label className="h6" htmlFor="romanInput">Roman numeral:</label>
                <input type="text" id="romanInput" className="form-control mb-2 mr-sm-2 d-inline" name="roman" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <div className="d-grid vstack gap-3">
                  <button type="submit" className="btn btn-primary mb-1">Submit</button>
                </div>
              </fieldset>
            </form>
          </div>

          <div className="col-12 col-md-6 mb-2">
            <form onSubmit={handleGet} className="form-inline">
              <fieldset>
                <legend className="h6">Get Result</legend>
                <label className="h6" htmlFor="id">Enter ID of Result:</label>
                <input type="number" id="id" className="form-control mb-2 mr-sm-2 d-inline" name="id" />
                <div className="d-grid vstack gap-3">
                  <button type="submit" className="btn btn-primary mb-1">Submit</button>
                </div>
              </fieldset>
              <div id="result">{result}</div>
            </form>
          </div>

          <div className="col-12">
            <form onSubmit={handleUpdate} className="form-inline">
              <fieldset>
                <legend className="h6">To Update</legend>
                <label className="h6" htmlFor="id-update">Enter ID </label>
                <input type="number" id="id-update" name="id-update" className="form-control mb-2 mr-sm-2 d-inline" min="1" value={updateId} onChange={(e) => setUpdateId(e.target.value)} />
                <label className="h6" htmlFor="roman-update">Roman Number</label>
                <input type="text" id="roman-update" name="roman-update" className="form-control mb-2 mr-sm-2 d-inline" value={updateRoman} onChange={(e) => setUpdateRoman(e.target.value)} />
                <div className="d-grid vstack gap-3">
                  <button type="submit" className="btn btn-primary mb-1">Submit</button>
                </div>
              </fieldset>
              <div id="result-updated">{resultUpdated}</div>
            </form>
          </div>

          <div className="col-12 col-md-6 mb-2 mt-3">
            <form onSubmit={handleDelete} className="form-inline">
              <fieldset>
                <legend className="h6">To Delete</legend>
                <label className="h6" htmlFor="id-delete">Enter ID of Result:</label>
                <input type="number" id="id-delete" name="id-delete" className="form-control mb-2 mr-sm-2 d-inline" required />
                <div className="d-grid vstack gap-3">
                  <button type="submit" className="btn btn-primary mb-1">Submit</button>
                </div>
              </fieldset>
              <div id="result2">{result2}</div>
            </form>
          </div>

          <div className="col-12 col-md-6 mt-3">
            <table className="table table-dark p-3">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Roman</th>
                  <th scope="col">Conversion</th>
                </tr>
              </thead>
              <tbody id="roman-values"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
