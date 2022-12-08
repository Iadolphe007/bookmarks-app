let siteInput = document.getElementById("site");
let urlInput = document.getElementById("url");
let commentInput = document.getElementById("comment");
let category = document.getElementById("category");
let saveBtn = document.getElementById("save-btn");
let listInput = document.getElementById("listinput");

let inputArr = [];
let urlArr = [];
let commentArr = [];
let categoryArr = [];

let localEL = JSON.parse(localStorage.getItem("inputArr"));
let localURL = JSON.parse(localStorage.getItem("urlArr"));
let localComment = JSON.parse(localStorage.getItem("commentArr"));
let localCategory = JSON.parse(localStorage.getItem("categoryArr"));

let deleteBtn = document.getElementById("clear-btn");

if (localEL) {
	inputArr = localEL;
	urlArr = localURL;
	commentArr = localComment;
	categoryArr = localCategory;
	showItem();
}
deleteBtn.addEventListener("click", function () {
	
	inputArr = [];
	urlArr = [];
	commentArr = [];
	categoryArr = [];
	localStorage.clear();
	showItem();
});
saveBtn.addEventListener("click", function () {
    
    if(!siteInput.value || !urlInput.value){
        alert("you must complete name and url")
        return false;
    }else if(siteInput.value===" " || urlInput.value===" "){
        alert("you must complete name and url")
        return false;
    }
    
    let regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    
    if(!urlInput.value.match(regex)){
        alert("used valid url");
        return false
      }

// var regex = new RegExp(expression);
//     var t = 'www.google.com';

// if (t.match(regex)) {
//   alert("Successful match");
// } else {
//   alert("No match");
// }


	inputArr.push(siteInput.value);
	urlArr.push(urlInput.value);
	commentArr.push(commentInput.value);
	categoryArr.push(category.value);
	siteInput.value = " ";
	urlInput.value = " ";
	commentInput.value = " ";
	category.value = " ";

	localStorage.setItem("inputArr", JSON.stringify(inputArr));
	localStorage.setItem("urlArr", JSON.stringify(urlArr));
	localStorage.setItem("commentArr", JSON.stringify(commentArr));
	localStorage.setItem("categoryArr", JSON.stringify(categoryArr));
	
    showItem();
});

function showItem() {
	
    let input = " ";
	let categoryArr = JSON.parse(localStorage.getItem("categoryArr"));
	let uniqueCategory = [...new Set(categoryArr)];
	
    for (let i = 0; i < uniqueCategory.length; i++) {
		
        input += `<li>
            <h4>${uniqueCategory[i]}</h4>
            <ul>`;
		
            for (let j = 0; j < inputArr.length; j++) {
			
            if (uniqueCategory[i] === categoryArr[j]) {
				input += `<li>
                    <a target = '_blank' href=${urlArr[j]}>${inputArr[j]} - ${commentArr[j]}</a>
                    <button id="delete-btn" onclick="deleteItem(${j})">Delete</button>
                    </li>`;
			}
		}
		input += `</ul>
            </li>`;

           
	}
	listInput.innerHTML = input;
}

function deleteItem(index) {
	
    inputArr.splice(index, 1);
	urlArr.splice(index, 1);
	commentArr.splice(index, 1);
	
    localStorage.setItem("inputArr", JSON.stringify(inputArr));
	localStorage.setItem("urlArr", JSON.stringify(urlArr));
	localStorage.setItem("commentArr", JSON.stringify(commentArr));
	
    showItem();
}

// function viewItem(index) {
// 	let input = " ";
// 	input += `<li>
//         <h4>${categoryArr[index]}</h4>
//         <ul>
//             <li>
//                 <a target = '_blank' href=${urlArr[index]}>${inputArr[index]} - ${commentArr[index]}</a>
//                 <button onclick="deleteItem(${index})">Delete</button>
//             </li>
//         </ul>
//         </li>`;
// 	listInput.innerHTML = input;
// }
