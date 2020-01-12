const container = document.getElementById('employee-container');

// Fetch Employee

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => {
        console.log(data.results);
        createArray(data.results);
        generateHTML(employeeArray);
    })

// Create Employee Array

const employeeArray = [];
function createArray(data) {
    data.forEach(element => {
       employeeArray.push({
           'image': element.picture.large,
           'firstName': element.name.first,
           'lastName': element.name.last,
           'email': element.email,
           'phone': element.cell,
           'city': element.location.city,
           'state': element.location.country,
           'streetName': element.location.street.name,
           'streetNumber': element.location.street.number,
           'postcode': element.location.postcode,
           'birthdate': element.dob.date.slice(0, 10)
       }); 
    });
    return employeeArray;
}

// create HTML

let html = "";
function generateHTML (arr){
    for(let i = 0; i < employeeArray.length; i++) {
        html += '<div class="card">';
        html += `<img src="${arr[i].image}" alt="Profile Image">`;
        html += '<div class="card-text">';
        html += `<h2>${arr[i].firstName} ${arr[i].lastName}</h2>`;
        html += `<p>${arr[i].email}</p>`;
        html += `<p>${arr[i].city}</p>`;
        html += '</div>';
        html += '</div>';
    }
    container.innerHTML = html;
}