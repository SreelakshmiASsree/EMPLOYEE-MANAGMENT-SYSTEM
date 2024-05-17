var viewDetails = new URLSearchParams(document.location.search);

let id = viewDetails.get("id");

recall()
function recall(){
fetch(`http://localhost:3000/api/employees/${id}`,{
    method :'GET',
    header : {
        'content-type' : 'application/json',
    }
})
.then(result => result.json())
.then(data =>{


    let UserName = data.salutation + " " +data.firstName + " " +data.lastName;
    document.getElementById("user-Name").innerHTML = UserName;
    document.getElementById("user-Email").innerHTML = data.email;
    document.getElementById("view-Gender").innerHTML = data.gender;
    document.getElementById("view-Quali").innerHTML = data.qualifications;
    document.getElementById("view-Phone").innerHTML = data.phone;
    document.getElementById("view-Age").innerHTML = birth(data.dob);
    document.getElementById("view-Address").innerHTML = data.address;
    document.getElementById("view-Dob").innerHTML = data.dob
    let fullName = data.firstName + "" + data.lastName;
    document.getElementById("view-username").innerHTML = fullName;

    const viewimage = document.getElementById("viewimage");
    viewimage.src =`http://localhost:3000/uploads/${id}.png`;


    function birth (dob){
        const dateofbirth = dob.split("-");
        var day = (dateofbirth[0]);
        var month = (dateofbirth[1]);
        var year = (dateofbirth[2]);
        const currentDate = new Date();
         var calculateage = currentDate.getFullYear() - year;
         console.log(calculateage);

         if(currentDate.getMonth()< month-1 || currentDate.getMonth() === month-1 
            && currentDate.getDay()<day){
                calculateage--
            }
            return calculateage;
    }
    birth(data.dob);
})
}
// edit viewDetailsssss


function viewEditformClose() {
    const editemployeeform = document.getElementById("vieweditform");
    editemployeeform.style.display = "none";
    
}

//EDITTT 

// function vieweditid(id) {
//     viewEditformopen(id);
//       console.log("view",id);

function viewEditformopen() {
    const editemployeeform = document.getElementById("vieweditform");
    editemployeeform.style.display = "block";
    overlayon()
   
    fetch(`http://localhost:3000/api/employees/${id}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        
        console.log(data.dob);
        const formData = changeData(data.dob);

        function changeData() {
            dateArr = data.dob.split("-");
            let date = dateArr[2];
            let month = dateArr[1];
            let year = dateArr[0];
            const showFormat = date + "-" + month + "-" + year;
            console.log("update format is", showFormat);
            return showFormat;
        }
        const editviewimage = document.getElementById("editviewimage");
        editviewimage.src = `http://localhost:3000/uploads/${id}.png`;
        document.getElementById("Salutation").value = data.salutation;
        document.getElementById("firstName").value = data.firstName;
        document.getElementById("lastName").value = data.lastName;
        document.getElementById("email").value = data.email;
        document.getElementById("phone").value = data.phone;
        document.getElementById("dob").value = formData;
        document.getElementById("qualifications").value = data.qualifications;
        document.getElementById("address").value = data.address;
        document.getElementById("country").value = data.country;
        document.getElementById("state").value = data.state;
        document.getElementById("city").value = data.city;
        document.getElementById("edit-pin").value = data.pin;

        var malechecked = document.getElementById("malechecked");
        var femchecked = document.getElementById("femchecked");
        const gender = data.gender;

        if (gender === "Male") {
            malechecked.checked = true;
        } else if (gender === "Female") {
            femchecked.checked = true;
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
   
}
    const formedit = document.getElementById("formedit");
    // formedit.addEventListener("submit", (e) => {
    //     console.log("this is my id",Id)
    //     e.preventDefault();/
    function viewedit(){
        var salutation = document.getElementById("Salutation").value;
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var dob = document.getElementById("dob").value;
        var address = document.getElementById("address").value;
        var city = document.getElementById("city").value;
        var state = document.getElementById("state").value;
        var country = document.getElementById("country").value;
        var qualifications = document.getElementById("qualifications").value;
        var malechecked = document.getElementById("malechecked");
        var femchecked = document.getElementById("femchecked");
       
       
        const formData = changeData(dob);
        function changeData(dob) {
            dateArr = dob.split("-");
            let date = dateArr[2];
            let month = dateArr[1];
            let year = dateArr[0];
            const showFormat = date + "-" + month + "-" + year;
            console.log("update format is", showFormat);
            return showFormat;
        }

        const editnewForm = {
            salutation,
            firstName,
            lastName,
            email,
            phone,
            gender:malechecked.checked?"Male":"Female",
            qualifications,
            address,
            city,
            state,
            country,
            username: firstName + lastName,
            password: dob + email,
            dob: formData
        };
        console.log("aaaaaaa",editnewForm)
        // const newId = Id;
        console.log("this is my id",id)
        fetch(`http://localhost:3000/api/employees/${id}`, {
            method: 'PUT',
            headers: { 
                'content-type': 'application/json'
             },
            body: JSON.stringify(editnewForm)
        })
        .then(Response => Response.json())

        .then(data => {
            // updateUI(data);
            recall()
            console.log("updated employee",data);
            viewEditformClose();

        })

        .catch(editError => {
            console.error("Error:", editError);
        });
    };



//DELETE VIEWW PAGE
function viewdeletepageOpen(){
    const  deleteform = document.getElementById("viewdeleteData");
    deleteform.style.display = "block";
    // overlayOn()
 }
 function viewdeletepageClose(){
     const deleteform = document .getElementById("viewdeleteData");
     deleteform.style.display = "none";
    //  overlayOff()
 }

 // DELETE DETAILSsssss///

     function dele(){
        viewdeletepageOpen()
         const personlId = id;
         console.log("delet id", personlId);
         const del = document.getElementById("confirmDelete");
         del.addEventListener('submit', function confirmDelete(){
             fetch(`http://localhost:3000/api/employees/${personlId}`,{
                 method:'DELETE'
             })
             .then(response =>response.json())

             .then(data =>{
                 console.log("page",data);
                 window.location.href = "http://localhost:3000/api/employees";
             })
               
         })
           
     }

     //overlay///

     function overlayon(){
        const overlay = document.getElementById("overlay");
        overlay.style.display = "block";
     }


    //  editpageeeeeeeeeeeeee validationnnn

    const errormsg = document.getElementsByClassName("errormsg");
const submitButton = document.getElementById("subId");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    validateInput(Salutation, 0, "Select Salutation");
    validateInput(firstName, 1, "Enter first name");
    validateInput(lastName, 2, "Enter last name");
    validateInput(email, 3, "Enter Email");
    validateInput(phone, 4, "Enter Mobile Number");
    validateInput(dob, 5, "Enter Date of Birth");
    validateGender();
    validateInput(qualifications, 7, "Enter Qualification");
    // validateInput(address, 8, "Enter password");
    validateInput(address, 8, "Enter Address");
    validateInput(country, 9, "Select country");
    validateInput(state, 10, "Select State");
    validateInput(city, 11, "Enter City");
    //   validateInput(pinField, 12, "Enter Pin/Zip");
    viewedit();

})
const validateInput = (input, serial, msg) => {
    if (input.value.trim() === "") {
        errormsg[serial].innerHTML = msg;
    } else {
        errormsg[serial].innerHTML = "";
    }
}
const validateGender = () => {
    if (!malechecked.checked && !femchecked.checked) {
        errormsg[6].innerHTML = "Select gender";
    } else {
        errormsg[6].innerHTML = "";
    }
}



// Add event listeners for input fields in the edit form
Salutation.addEventListener("input", () => removeValidationErrors(0));
firstName.addEventListener("input", () => removeValidationErrors(1));
lastName.addEventListener("input", () => removeValidationErrors(2));
email.addEventListener("input", () => removeValidationErrors(3));
phone.addEventListener("input", () => removeValidationErrors(4));
dob.addEventListener("input", () => removeValidationErrors(5));
malechecked .addEventListener("input", () => removeValidationErrors(6));
femchecked.addEventListener("input", () => removeValidationErrors(6));
qualifications.addEventListener("input", () => removeValidationErrors(7));
// Password.addEventListener("input", () => removeValidationErrors(8));
address.addEventListener("input", () => removeValidationErrors(8));
country.addEventListener("input", () => removeValidationErrors(9));
state.addEventListener("input", () => removeValidationErrors(10));
city.addEventListener("input", () => removeValidationErrors(11));
// pinEdit.addEventListener("input", () => removeValidationErrors(12));

// Function to remove validation error messages in the edit form
function removeValidationErrors(serial) {
    const errormsg = document.querySelectorAll(".errormsg");
    errormsg [serial].innerHTML = ""; // Remove the validation error message
}