// overlayyyy

function overlayOn() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "block";
}

function overlayOff() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";

}


//pagination
var currentPage = 1;
function pagination(totalPage){

}

//----------popup-------//

// Add employe***********
function formOpen() {
    const addemployeeform = document.getElementById("employeeform");
    addemployeeform.style.display = "block";
    overlayOn()
}
function formClose() {
    const addemployeeform = document.getElementById("employeeform");
    addemployeeform.style.display = "none";
    overlayOff()
}

// fetch method ////////

itemsperpage = 5;
var table = [];
formList()
async function formList() {
    try {
        const response = await fetch("http://localhost:3000/api/employees");
        const objectdata = await response.json();
        table = objectdata;

        displayData(1)
        renderpagination();
    } catch (error) {
        console.log("Error:", error);
    }

}


var datacount = document.getElementById("floatingSelect");
datacount.addEventListener("change", function () {
    console.log("pagecount is working", datacount.value);
    itemsperpage = parseInt(datacount.value);
    formList();
})

//pagination///
var currentpage = 1;


// const totalnumemployee = document.getElementById("totalnumemployee");
// totalnumemployee.innerHTML = `of ${table.length}`; 

function displayData(page) {

    const start = (page - 1) * itemsperpage;
    const end = start + itemsperpage;
    console.log("dgccgcc",table);
    const paginateData = table.slice(start, end);

    //fetch   
    let serialNumber = start + 1;
    const data1 = paginateData.map((values) => {
        const id = values.id;

        const formatSl = String(serialNumber++).padStart(2, "0");
        return `
            <tr >
                <th scope="row">#${formatSl}</th>
                <td><img class="imageview" src="http://localhost:3000/uploads/${values._id}.png" alt="" height="30px" width="30px">${values.salutation}.${values.firstName}.${values.lastName}</td>
                <td>${values.email}</td>
                <td>${values.phone}</td>
                <td>${values.gender}</td>
                <td>${values.dob}</td>
                <td>${values.country}</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/index2?id=${values._id}"><i class="fa-regular fa-eye"></i>View details</a></li>
                            <li><a class="dropdown-item" href="#" onclick="editid('${values._id}')"><i class="fa-solid fa-pencil"></i>Edit</a></li>
                            <li><a class="dropdown-item" href="#" onclick="dele('${values._id}')"><i class="fa-solid fa-trash"></i>Delete</a></li>
                        </ul>
                    </div>
                </td>
            </tr>`;
    })

        .join('');
    document.getElementById("user_details").innerHTML = data1;
}
//paginationnn///////

function renderpagination() {
    // itemsperpage = 5;

    pagination = document.getElementById("pagination");
    pagination.innerHTML = "";


    var leftdoubleclick = document.createElement("li");
    leftdoubleclick.innerHTML = '<i class="fa-solid fa-angles-left"></i>';
    pagination.appendChild(leftdoubleclick);

    leftdoubleclick.addEventListener("click", () => {
        if (currentpage >= 3) {

            currentpage = currentpage - 2;
        }
        else {
            currentpage
        }
        displayData(currentpage);
        colorselector(currentpage)
    })


    var leftclick = document.createElement("li");
    leftclick.innerHTML = '<i class="fa-solid fa-chevron-left"></i>'
    pagination.appendChild(leftclick);

    leftclick.addEventListener("click", () => {
        if (currentpage > 1) {
            currentpage--
        }
        else {
            currentpage = 1;
        }
        displayData(currentpage);
        colorselector(currentpage)
    })




    totalpage = Math.ceil(table.length / itemsperpage);

    for (let i = 1; i <= totalpage; i++) {

        const pageItem = document.createElement("li")
        pageItem.textContent = i;

        //--------- color selector---------//

        if (i === currentpage) {
            pageItem.classList.add("selected");
        }
        //------------

        pagination.appendChild(pageItem);

        pageItem.addEventListener('click', () => {
            currentpage = i;
            displayData(currentpage)
            colorselector(currentpage)
        })
    }



    var rightclick = document.createElement("li");
    rightclick.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    pagination.appendChild(rightclick);

    rightclick.addEventListener("click", () => {
        if (currentpage < totalpage) {
            currentpage++
        }
        else {
            currentpage = totalpage;
        }
        displayData(currentpage);
        colorselector(currentpage)
    })


    var rightdoubleclick = document.createElement("li");
    rightdoubleclick.innerHTML = '<i class="fa-solid fa-angles-right"></i>';
    pagination.appendChild(rightdoubleclick);
    rightdoubleclick.addEventListener("click", () => {
        if (currentpage <= totalpage - 2) {
            currentpage = currentpage + 2;
        }
        else {
            currentpage;
        }
        displayData(currentpage)
        colorselector(currentpage)
    })

}
renderpagination();
displayData(currentpage)





function colorselector(currentpage) {
    const buttons = pagination.querySelectorAll("li");
    buttons.forEach((li) => {
        if (parseInt(li.textContent) === currentpage) {
            li.classList.add("selected");
        }
        else {
            li.classList.remove("selected");
        }

    });
}



// submit form//////
const form = document.getElementById("form");
function add() {
    var salutation = document.getElementById("Salutation")?.value;
    var firstName = document.getElementById("firstName")?.value;
    var lastName = document.getElementById("lastName")?.value;
    var email = document.getElementById("email")?.value;
    var phone = document.getElementById("phone")?.value;
    var dob = document.getElementById("dob")?.value;
    var address = document.getElementById("address")?.value;
    var city = document.getElementById("city")?.value;
    var state = document.getElementById("state")?.value;
    var country = document.getElementById("country")?.value;
    var qualifications = document.getElementById("qualifications")?.value;
    var password = document.getElementById("Password")?.value;
    var maleradio = document.getElementById("maleradio");
    // date of birth////
    var formData = changeData(dob);
    function changeData(dob) {
        dateArr = dob.split("-");
        let date = dateArr[2];
        let month = dateArr[1];
        let year = dateArr[0];
        const showFormat = date + "-" + month + "-" + year;
        console.log("update format is", showFormat)
        return showFormat;
    }
    
    const newForm = {
        salutation,
        firstName,
        lastName,
        email,
        phone, gender, qualifications, address,
        city, state, country,
        gender: maleradio.checked ? "Male" : "Female",
        username: firstName + lastName,
        password,
        dob: formData
    }
    //   postemployee details//////

    console.log("form", newForm);

   
    fetch("http://localhost:3000/api/employees", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newForm)
    })

        .then(resData =>{
            
            if(!resData.ok){
                throw new error("errorrr");
            }
            else{
                formClose() ;
            }
           return resData.json()          
        })
        .then(data => {
            console.log("success",data);
          
            // image upload////
            const uploadimage = document.getElementById("form-file");
            const avatarim = uploadimage.files[0];
            console.log("nhjg",avatarim);
            const formData = new FormData();
            formData.append("image", avatarim);
   

            fetch(`http://localhost:3000/api/employees/${data._id}/image`, {
                method: "POST",
                body: formData,
            })

            formList()
            //----------array reverse-------//

            // if (data.ok) {


                // newForm.id = data.id;
                // table.unshift(newForm);
                // displayData(1);
                
            // }


            // else {
            //     console.log("dgdgd");

            // }

           
        })

        //---------pop---------//

        // .then(() =>{
        //     Swal.fire({
        //         icon: "success",

        //         title:"add employee success",
        //         showconfirmButton:false,
        //         timer:1500,
        //     });
        // })

        
}



//image view///

function addImagecall() {
    var preview = document.getElementById("imagePreview");
    preview.src = URL.createObjectURL(event.target.files[0]);
}

// delete button///////////

function deletepageOpen() {
    const deleteform = document.getElementById("deleteData");
    deleteform.style.display = "block";
    overlayOn()
}
function deletepageClose() {
    const deleteform = document.getElementById("deleteData");
    deleteform.style.display = "none";
    overlayOff()
}

// DELETE DETAILSsssss///

function dele(id) {
    deletepageOpen()
    // const personlId = Id;
  
    const del = document.getElementById("confirmDelete");
    del.addEventListener('click',  async function confirmDelete() {
        try {
    
            const reponse = await fetch(`http://localhost:3000/api/employees/${id}`, {
                method: 'DELETE'
            });
            if(!reponse.ok){
                throw new Error("failed to delete employee")
            }
            deletepageClose(); 
            formList();

        } catch (error) {
            console.error("delete error:",error);
         
        }
         
           
        // arrDele(Id);
    });

}




// function  arrDele(Id){

//     table = table.filter(element => element.id !== Id)
    
//     console.log("tableee",table)
//     displayData(1)
// }


// ####edit form open employee#####

function editformOpen() {
    const editemployeeform = document.getElementById("editform");
    editemployeeform.style.display = "block";
    overlayOn()
}
function editformClose() {
    const editemployeeform = document.getElementById("editform");
    editemployeeform.style.display = "none";
    overlayOff()
}



// // EDIT FORM 
var gloabalpassword;
var gId;
function editid(id) {
    editformOpen(id);
    gId = id
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
            console.log("edit", data);

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

            gloabalpassword = data.password;
            document.getElementById("edit-salutation").value = data.salutation;
            document.getElementById("edit-firstname").value = data.firstName;
            document.getElementById("edit-lastname").value = data.lastName;
            document.getElementById("edit-email").value = data.email;
            document.getElementById("edit-phone").value = data.phone;
            document.getElementById("edit-dob").value = formData;
            document.getElementById("edit-qualifi").value = data.qualifications;
            document.getElementById("edit-address").value = data.address;
            document.getElementById("edit-country").value = data.country;
            document.getElementById("edit-state").value = data.state;
            document.getElementById("edit-city").value = data.city;
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



    const editpreview = document.getElementById("edit-uploadimage");
    editpreview.src = `http://localhost:3000/uploads/${id}.png`;


}
    const formedit = document.getElementById("formedit");
     function editvalue() {
        var salutation = document.getElementById("edit-salutation").value;
        var firstName = document.getElementById("edit-firstname").value;
        var lastName = document.getElementById("edit-lastname").value;
        var email = document.getElementById("edit-email").value;
        var phone = document.getElementById("edit-phone").value;
        var dob = document.getElementById("edit-dob").value;
        var address = document.getElementById("edit-address").value;
        var city = document.getElementById("edit-city").value;
        var state = document.getElementById("edit-state").value;
        var country = document.getElementById("edit-country").value;
        var qualifications = document.getElementById("edit-qualifi").value;
        var malechecked = document.getElementById("malechecked");
        var femchecked = document.getElementById("femchecked");

        //---dob---//
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
            gender: malechecked.checked ? "Male" : "Female",
            qualifications,
            address,
            city,
            state,
            country,
            username: firstName + lastName,
            password: gloabalpassword,
            dob: formData
        };
        const newId = gId;
        fetch(`http://localhost:3000/api/employees/${newId}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(editnewForm)
        })
            // .then(editResponse => {
            //     if (!editResponse.ok) {
            //         return editResponse.text().then(errorText => {
            //             throw new Error(`HTTP error! Status: ${editResponse.status}, Message: ${errorText}`);
            //         });
            //     }
            // })
            // .catch(editError => {
            //     console.error("Error:", editError);
            // });
            formList()
            editformClose()
            
        //----edit image upload---- //
        const editPreviewimage = document.getElementById("editPreviewimage");
        const editData = new FormData();
        editData.append("image", editPreviewimage.files[0]);

         fetch(`http://localhost:3000/api/employees/${newId}/image`, {
            method: "POST",
            body: editData,
        })
    };

//---edit viewimage change image--///

document.getElementById("editPreviewimage").addEventListener('change', function (event) {
    const input = event.target;
    const preview = document.getElementById("edit-uploadimage");
    const reader = new FileReader();
    reader.onload = function (e) {
        preview.src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
})


// ----SEARCH BAR----//

// function search() {
//     var input, filter, found, table, tr, td, i, j;
//     input = document.getElementById("searchInput");
//     filter = input.value.toUpperCase();
//     table = document.getElementById("table");
//     tr = table.getElementsByTagName("tr");
//     for (i = 0; i < tr.length; i++) {
//         td = tr[i].getElementsByTagName("td");
//         for (j = 0; j < td.length; j++) {
//             if (td[j].textContent.toUpperCase().includes(filter)) {
//                 found = true;
//             }

//         }
//         if (found) {
//             tr[i].style.display = "";
//             found = false;
//         } else {
//             tr[i].style.display = "none";
//         }
//     }
// }


//-------- POST VALIDATION -------//

const errorMsg = document.getElementsByClassName("errorMsg");
const submitButton = document.getElementById("submitButton");
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
    validateInput(address, 8, "Enter password");
    validateInput(address, 9, "Enter Address");
    validateInput(country, 10, "Select country");
    validateInput(state, 11, "Select State");
    validateInput(city, 12, "Enter City");
    //   validateInput(pinField, 12, "Enter Pin/Zip");
    

})
const validateInput = (input, serial, msg) => {
    if (input.value.trim() === "") {
        errorMsg[serial].innerHTML = msg;
    } else {
        errorMsg[serial].innerHTML = "";
    }
}
const validateGender = () => {
    if (!maleradio.checked && !femradio.checked) {
        errorMsg[6].innerHTML = "Select gender";
    } else {
        errorMsg[6].innerHTML = "";
    }
}



// Add event listeners for input fields in the edit form
Salutation.addEventListener("input", () => removeValidationErrors(0));
firstName.addEventListener("input", () => removeValidationErrors(1));
lastName.addEventListener("input", () => removeValidationErrors(2));
email.addEventListener("input", () => removeValidationErrors(3));
phone.addEventListener("input", () => removeValidationErrors(4));
dob.addEventListener("input", () => removeValidationErrors(5));
maleradio.addEventListener("input", () => removeValidationErrors(6));
femradio.addEventListener("input", () => removeValidationErrors(6));
qualifications.addEventListener("input", () => removeValidationErrors(7));
Password.addEventListener("input", () => removeValidationErrors(8));
address.addEventListener("input", () => removeValidationErrors(9));
country.addEventListener("input", () => removeValidationErrors(10));
state.addEventListener("input", () => removeValidationErrors(11));
city.addEventListener("input", () => removeValidationErrors(12));
// pinEdit.addEventListener("input", () => removeValidationErrors(12));

// Function to remove validation error messages in the edit form
function removeValidationErrors(serial) {
    const errorMsgs = document.querySelectorAll(".errorMsg");
    errorMsgs[serial].innerHTML = ""; // Remove the validation error message
}



// //-------- edit VALIDATION -------//

// const editerrorMsg = document.getElementsByClassName("editerrorMsg");
// const subId = document.getElementById("subId");
// subId.addEventListener("click", (e) => {
//     // function validation (){
//     e.preventDefault();
//     console.log(gloabalpassword,"dgdgdddhhdhdh");

//     //----------id calling--------------//
//     var validsalutation = document.getElementById("edit-salutation")
//     var validfirstname = document.getElementById("edit-firstname")
//     var validlastname = document.getElementById("edit-lastname");
//     var validemail = document.getElementById("edit-email");
//     var validphone = document.getElementById("edit-phone");
//     var validdob = document.getElementById("edit-dob");
//     // var validmalechecked = document.getElementById("malechecked");
//     // var validfemalechecked = document.getElementById("femchecked");
//     var validqualifi = document.getElementById("edit-qualifi");
//     var validaddress = document.getElementById("edit-address");
//     var validcountry = document.getElementById("edit-country");
//     var validstate = document.getElementById("edit-state");
//     var validcity = document.getElementById("edit-city");



//         //-------validation----------//
//     editvalidateInput(validsalutation, 0, "Select Salutation");
//     editvalidateInput(validfirstname, 1, "Enter first name");
//     editvalidateInput(validlastname, 2, "Enter last name");
//     editvalidateInput(validemail, 3, "Enter Email");
//     editvalidateInput(validphone, 4, "Enter Mobile Number");
//     editvalidateInput(validdob, 5, "Enter Date of Birth");
//      editvalidateGender();
//     editvalidateInput(validqualifi, 7, "Enter Qualification");
//     // editvalidateInput(address, 8, "Enter password");
//     editvalidateInput(validaddress, 8, "Enter Address");
//     editvalidateInput(validcountry, 9, "Select country");
//     editvalidateInput(validstate, 10, "Select State");
//     editvalidateInput(validcity, 11, "Enter City");
//     //   validateInput(pinField, 12, "Enter Pin/Zip");
    
//     editvalue();
     
// })
// const editvalidateInput = (input, serial, msg) => {
//     if (input.value === "") {
//         editerrorMsg[serial].innerHTML = msg;
//     } else {
//         editerrorMsg[serial].innerHTML = "";
//     }
// }
// var validmalechecked = document.getElementById("malechecked");
// var validfemalechecked = document.getElementById("femchecked");
// const editvalidateGender = () => {
//     if (!validmalechecked.checked && !validfemalechecked.checked) {
//         editerrorMsg[6].innerHTML = "Select gender";
//     } else {
//         editerrorMsg[6].innerHTML = "";
//     }
// }



// // Add event listeners for input fields in the edit form

//  validsalutation.addEventListener("input", () => editremoveValidationErrors(0));
// validfirstname.addEventListener("input", () => editremoveValidationErrors(1));
// validlastname.addEventListener("input", () => editremoveValidationErrors(2));
// validemail.addEventListener("input", () => editremoveValidationErrors(3));
// validphone.addEventListener("input", () => editremoveValidationErrors(4));
// validdob.addEventListener("input", () => editremoveValidationErrors(5));
// malechecked.addEventListener("input", () => editremoveValidationErrors(6));
// femchecked.addEventListener("input", () => editremoveValidationErrors(6));
// validqualifi.addEventListener("input", () => editremoveValidationErrors(7));
// // edit-Password.addEventListener("input", () => editremoveValidationErrors(8));
// validaddress.addEventListener("input", () => editremoveValidationErrors(8));
// validcountry.addEventListener("input", () => editremoveValidationErrors(9));
// validstate.addEventListener("input", () => editremoveValidationErrors(10));
// validcity.addEventListener("input", () => editremoveValidationErrors(11));
// // pinEdit.addEventListener("input", () => removeValidationErrors(12));

// // Function to remove validation error messages in the edit form
// function editremoveValidationErrors(serial) {
//     const editerrorMsg = document.querySelectorAll(".editerrorMsg");
//     editerrorMsg[serial].innerHTML = ""; // Remove the validation error message
// }

//searchbar

// function searchbar(){
//     let seachInput = document.getElementById("seachInput").value.toLowerCase();
//     if(seachInput){
//         fetch(`http://localhost:3000/api/employees/search/${seachInput}`)
//         .then((res) => {
//             if(!res.ok){
//                 throw new Error("response was not ok");
//             }
//             return res.json();
//         })
       
//     }
//     else {
//         formList();
//     }
// }
const searchInput = document.getElementById("searchInput");
// Function to fetch data from the backend using GET request
async function fetchData(searchParams) {
    try {
        const queryString = new URLSearchParams(searchParams).toString();
        const response = await fetch(`http://localhost:3000/api/employees/search?${queryString}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
           
        }
        console.log("data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        // return null;
    }
}
// Function to handle search input change event
searchInput.addEventListener("input", async () => {
   
    const searchValue = searchInput.value.trim();
    
    const searchParams = { firstName: searchValue}; 
    console.log("jhhkjhkh");// Modify as needed
    const data = await fetchData(searchParams);
  
    if (data) {
        // Update UI with fetched data
        console.log(data);
        const tableBody = document.getElementById('user_details');
        tableBody.innerHTML = '';
        data.forEach((values, i) => {
            id = values._id;
            const row = document.createElement('tr');
            row.innerHTML =`
            <tr>
            <th scope="row">#${i+1}</th>
              <td><img  class="addimage" src="http://localhost:3000/uploads/${values._id}.png"
               alt="" height ="30px" width ="30px">${values.salutation}.${
              values.firstName
            } ${values.lastName}</td>
              <td>${values.email}</td>
              <td>${values.phone}</td>
              <td>${values.gender}</td>
              <td>${values.dob}</td>
              <td>${values.country}</td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-" type="button"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-ellipsis"></i>
                  </button>
                  <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="/index2?id=${values._id}" onclick="viewDetial"><i class="fa-regular fa-eye"></i> View
                              Details</a></li>
                      <li><a class="dropdown-item" href="#" onclick="editformopen('${
                        values._id
                      }')"><i class="fa-solid fa-pencil"></i>
                              Edit</a></li>
                      <li><a class="dropdown-item" href="#" onclick="dele('${values._id}')"><i class="fa-solid fa-trash"></i>
                              Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>`;
            tableBody.appendChild(row);
        });
    }
    searchInput.addEventListener('input', handleSearchInput);
    function handleSearchInput() {
        const searchTerm = searchInput.value;
        if (searchTerm === "") {
            window.location.href = "http://localhost:3000";
        }
    }
        // Update your UI logic here
});


