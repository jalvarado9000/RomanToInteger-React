


//checks if the value inserted is not a string
const checkString((event) => {
  const inputValue = input.value;
  if (/\d/.test(inputValue)) {
    event.preventDefault();
    alert('Input cannot contain numbers!');
  }
});


//Post Roman Number
//const form = document.getElementById("myForm");
const handlePost((event) => {
  event.preventDefault();
  const data = {
    roman: event.target.value
  };
  fetch("http://localhost:8080/roman", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Success:", data);
    // handle success response here
    
    // Reload the page after successful processing
    location.reload();
  })
  .catch((error) => {
    console.error("Error:", error);
    // handle error response here
  });
});

    //GetAllElements
    fetch('http://localhost:8080/roman/int')
        .then(response => response.json())
        .then(data => {
          const romanValues = document.getElementById('roman-values');
          data.forEach(item => {
            const row = document.createElement('tr');
            const id = document.createElement('td');
            id.innerText = item.id;
            const roman = document.createElement('td');
            roman.innerText = item.roman;
            const conversion = document.createElement('td');
            conversion.innerText = item.conversion;
            row.appendChild(id);
            row.appendChild(roman);
            row.appendChild(conversion);
            romanValues.appendChild(row);
            
          });
        })
        .catch(error => console.error(error));

        

       


//deletes by id
const deleteForm = document.getElementById('deleteForm');
deleteForm.addEventListener('submit', handleDelete);

function handleDelete(event) {
  event.preventDefault();
  const id = document.getElementById('id-delete').value;
  const url = `http://localhost:8080/roman/${id}/delete`;

  fetch(url, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
      return response.json();
    })
    .then(data => {
      const resultContainer = document.getElementById('result-2');
      resultContainer.innerHTML = `Deleted data with ID: ${data.id}`;
    })
    .catch(error => console.error(error));
    location.reload();
}


//updates element but doesnt work
function handleSubmit(event) {
  event.preventDefault();
  const idInput = document.getElementById('id-update');
  const roman = document.getElementById('roman-update').value;

  const id = parseInt(idInput.value, 10);

  if (isNaN(id)) {
    alert('Please enter a valid number.');
    return;
  }

  const url = `http://localhost:8080/roman/${id}/update`;

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, roman }) // Send both id and roman in the request body
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const resultContainer = document.getElementById('result-updated');
      resultContainer.innerHTML = `ID: ${data.id}, Roman: ${data.roman}, Conversion: ${data.conversion}`;
      location.reload();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      // Handle the error gracefully (e.g., display an error message to the user)
    });
}



 //GetElementById
 const form2 = document.getElementById('myForm2');
 form2.addEventListener('submit', handleSubmit);
 
 function handleSubmit(event) {
   event.preventDefault();
   const id = document.getElementById('id').value;
   const url = `http://localhost:8080/roman/${id}`;
 
   fetch(url)
     .then(response => response.json())
     .then(data => {
       const resultContainer = document.getElementById('result');
       resultContainer.innerHTML = `ID: ${data.id}, Roman: ${data.roman}, Conversion: ${data.conversion}`;
     })
     .catch(error => console.error(error));
 }
