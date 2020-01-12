const container = document.getElementById('employee-container');
const modalContainer = document.getElementById('modal-container');
const $search = $('#search');

// Fetch Employee

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => {
        createArray(data.results);
        generateHTML(employeeArray);
    });

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

// Create HTML

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

// Search Filter

$search.on('keyup', function(){
    var input = $search.val().trim().toLowerCase();
    for (var i = 0; i < employeeArray.length; i++) {
        var name = employeeArray[i].firstName.toLowerCase() + ' ' + employeeArray[i].lastName.toLowerCase();
        var NameController = name.includes(input);
        if(NameController) {
            $('#employee-container').children().eq(i).show();
        } else {
            $('#employee-container').children().eq(i).hide();
        } 
    }  
});

// Create Modal 
let index;
$('document').ready(function() {
    $('#employee-container').on('click', '.card', function(){
        index = $(this).index();
        generateModalHTML(index);
        $('#modal-container').css('display', 'block');
        return index;
    });
});

// Create Modal Card

let modalHTML = "";
function generateModalHTML(index) {
    modalHTML += '<div id="cardContainer">';
    modalHTML += '<span id="leftArrow"><</span>';
    modalHTML += '<div id="selectedCard">';
    modalHTML += '<p id="exitModal">X</p>';
    modalHTML += `<img src="${employeeArray[index].image}" alt="Profile Image">`;
    modalHTML += '<div class="selectedCard-text">';
    modalHTML += `<h2>${employeeArray[index].firstName} ${employeeArray[index].lastName}</h2>`;
    modalHTML += `<p>${employeeArray[index].email}</p>`;
    modalHTML += `<p>${employeeArray[index].city}</p>`;
    modalHTML += '<div id="modalLine"></div>';
    modalHTML += `<p>${employeeArray[index].phone}</p>`;
    modalHTML += `<p>${employeeArray[index].streetNumber} ${employeeArray[index].streetName}, ${employeeArray[index].postcode}</p>`;
    modalHTML += `<p>Birthday: ${employeeArray[index].birthdate}</p>`;
    modalHTML += '</div>';
    modalHTML += '</div>';
    modalHTML += '<span id="rightArrow">></span>';
    modalHTML += '</div>';
    modalContainer.innerHTML = modalHTML;
    if(index === 0) {
        $('#leftArrow').css('visibility', 'hidden');
    } else {
        $('#leftArrow').css('visibility', 'visible');
    }
    if(index === 11) {
        $('#rightArrow').css('visibility', 'hidden');
    } else {
        $('#rightArrow').css('visibility', 'visible');
    }
}

// Exit Modal 

$('document').ready(function() {
    $('#modal-container').on('click', '#exitModal', function() {
        modalHTML = "";
        $('#cardContainer').remove();
        $('#modal-container').css('display', 'none');
    });
});

// Modal Arrow 

$('document').ready(function() {
    $('#modal-container').on('click', '#leftArrow', function() {
        index -= 1;
        modalHTML = "";
        $('#cardContainer').remove();
        generateModalHTML(index);
    });
});

$('document').ready(function() {
    $('#modal-container').on('click', '#rightArrow', function() {
        index += 1;
        modalHTML = "";
        $('#cardContainer').remove();
        generateModalHTML(index);
    });
});

