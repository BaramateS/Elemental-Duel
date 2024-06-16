// var ref = firebase.database().ref("MyList");

// let readList = () => {
//     document.getElementById("main-content").innerHTML = "";

//     const currentUser = firebase.auth().currentUser;
//     userListRef.child(currentUser.uid).once("value").then((snapshot) => {
//         snapshot.forEach((data) => {
//             var id = data.key;
//             var title = data.val().title;
//             const newDiv = `
//                 <div class="form-check d-flex justify-content-between">
//                     <label class="form-check-lebel">${title}</label>
//                     <span>
//                         <button type="button" class="btn btn-outline-danger btn-delete" data-id="${id}">
//                             <i class="bi bi-trash3"></i>
//                         </button>
//                     </span>
//                 </div>
//             `;
//             const newElement = document.createRange().createContextualFragment(newDiv);
//             document.getElementById("main-content").appendChild(newElement);
//         });
//         document.querySelectorAll("button.btn-delete").forEach((btn) => {
//             btn.addEventListener("click", deleteList);
//         });
//     });
// };

var ref = firebase.database().ref("Leaderboard");

// let readList = () => {
//     ref.once("value").then((snapshot) => {
//         snapshot.forEach((data) => {
//             var player = data.val();
//             console.log(player.Name);
//             let table_data = `
//                 <tr>
//                     <th scope="row">0</th>
//                     <td>${player.Name}</td>
//                     <td>${player.WR}</td>
//                     <td>${player.Score}</td>
//                 </tr>
//             `
//             const newElement = document.createRange().createContextualFragment(table_data);
//             document.getElementById("tbody").appendChild(newElement);
//         });
//     });
// };

// window.onload = readList;

const logoutItems = document.querySelectorAll(".logged-out");
const loginItems = document.querySelectorAll(".logged-in");

let setupUI = (user) => {
    if(user){
        document.querySelector("#user-profile-name").innerHTML = `Hello! ${user.displayName}`;
        loginItems.forEach((item) => (item.style.display = "inline-block"));
        logoutItems.forEach((item) => (item.style.display = "none"));
    }else{
        loginItems.forEach((item) => (item.style.display = "none"));
        logoutItems.forEach((item) => (item.style.display = "inline-block")); 
    }
}