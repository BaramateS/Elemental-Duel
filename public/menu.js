firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User :", user);
        // getList(user);
    }
    setupUI(user);
});

// Logout from currentUser
const btnLogout = document.querySelector("#btnLogout");
btnLogout.addEventListener("click", function () {
    firebase.auth().signOut();
    console.log("Logiut Complete.");
    window.location.replace("/index.html");
});

const btnMultiplayer = document.querySelector("#btnMultiplayer");
btnMultiplayer.addEventListener("click", () => {
    window.location.assign("/lobby.html");
});


const btnRule = document.querySelector("#btnRules");
btnRule.addEventListener("click", () => {
    window.location.assign("/Rules.html");
});

const btnStatistic = document.querySelector("#btnStatistic");
btnStatistic.addEventListener("click", () => {
    window.location.assign("/Statistics.html");
});

// const signupForm = document.querySelector("#signup-form");
// signupForm.addEventListener("submit", createUser);

// const signupFeedback = document.querySelector("#feedback-msg-signup");
// const signupModal = new bootstrap.Modal(document.querySelector("#modal-signup"));

// function createUser(event) {
//     event.preventDefault();
//     const email = signupForm["input-email-signup"].value;
//     const password = signupForm["input-password-signup"].value;

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then(() => {
//             signupFeedback.style = "color : green";
//             signupFeedback.innerHTML = "<i class='bi bi-check-circle-fill'></i> Signup completed.";
//             setTimeout(() => {
//                 signupModal.hide();
//                 signupForm.reset();
//             }, 1000)
//         })
//         .catch((error) => {
//             signupFeedback.style = "color : crimson";
//             signupFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}`;
//             signupForm.reset();
//         })
// }

// const loginForm = document.querySelector("#login-form");
// loginForm.addEventListener("submit", loginUser);

// const loginFeedback = document.querySelector("#feedback-msg-login");
// const loginModal = new bootstrap.Modal(document.querySelector("#modal-login"));

// function loginUser(event) {
//     event.preventDefault();
//     const email = loginForm["input-email-login"].value;
//     const password = loginForm["input-password-login"].value;

//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then(() => {
//             loginFeedback.style = "color: green";
//             loginFeedback.innerHTML = "<i class='bi bi-check-circle-fill'</i> Login succeed!.";
//             loginModal.hide();
//             loginForm.reset();
//             window.location.replace("/MainMenu.html");
//         })
//         .catch((error) => {
//             loginFeedback.style = "color: crimson";
//             loginFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}`
//             loginForm.reset();
//         })
// }

// const btnCancels = document.querySelectorAll(".btn-cancel");
// btnCancels.forEach((btn) => {
//     btn.addEventListener("click", () => {
//         signupForm.reset();
//         signupFeedback.innerHTML = "";

//         loginForm.reset();
//         loginFeedback.innerHTML = "";
//     })
// });