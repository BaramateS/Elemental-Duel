firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User :", user);
        // getList(user);
    }
    setupUI(user);
});

const btnLogout = document.querySelector("#btnLogout");
btnLogout.addEventListener("click", function () {
    firebase.auth().signOut();
    console.log("Logiut Complete.");
    window.location.replace("/index.html");
});