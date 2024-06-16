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

const btnStart = document.querySelector("#btnStartGame");
const gameRef = firebase.database().ref("Game");
const btnJoin = document.querySelectorAll(".btn-join")
btnJoin.forEach((btnJoin) => btnJoin.addEventListener('click', joinGame));

function joinGame(event){
    const currentUser = firebase.auth().currentUser;
    console.log("[join] Current user", currentUser);
    if(currentUser){
        const btnJoinID = event.currentTarget.getAttribute("id");
        const player = btnJoinID[btnJoinID.length-1];

        const playerForm = document.getElementById(`inputPlayer-${player}`);
        if (playerForm.value == ""){

            let tmpID = `user-${player}-id`;
            let tmpEmail = `user-${player}-email`;
            gameRef.child("game-1").update({
                [tmpID]: currentUser.uid,
                [tmpEmail]: currentUser.displayName
            });
            console.log(currentUser.displayName + ' added.');
            event.currentTarget.disabled = true;
        }
        
    }
}
gameRef.on( "value", (snapshot) => {
    getGameInfo(snapshot);
})


const btnCancelJoins = document.querySelectorAll(".btn-cancel-join-game");
btnCancelJoins.forEach((btnCancel) => btnCancel.addEventListener('click', cancelJoin));

function cancelJoin(event) {
    const currentUser = firebase.auth().currentUser;
    console.log("[Cancel] Current user:", currentUser);
    if (currentUser) {
        const btnCancelID = event.currentTarget.getAttribute("id");
        const player = btnCancelID[btnCancelID.length-1];

        const playerForm = document.getElementById(`inputPlayer-${player}`);
        if (playerForm.value && playerForm.value === currentUser.displayName){

            let tmpID = `user-${player}-id`;
            let tmpEmail = `user-${player}-email`;
            gameRef.child("game-1").child(tmpID).remove();
            gameRef.child("game-1").child(tmpEmail).remove();
            console.log( `delete on id: ${currentUser.uid}` );

            if (document.querySelector('#inputPlayer-x').value != ""){
                btnJoin[0].disabled = true;
            }
            if (document.querySelector('#inputPlayer-x').value == ""){
                btnJoin[0].disabled = false;
            }
            if (document.querySelector('#inputPlayer-o').value != ""){
                btnJoin[1].disabled = true;
            }
            if (document.querySelector('#inputPlayer-o').value == ""){
                btnJoin[1].disabled = false;
            }
            
}}}

function getGameInfo(snapshot){
    const currentUser = firebase.auth().currentUser;
    document.getElementById("inputPlayer-x").value = "";
    document.getElementById("inputPlayer-o").value = "";

    snapshot.forEach((data) => {
        const gameInfo = data.val();
        Object.keys(gameInfo).forEach((key) => {
            switch(key){
                case "user-x-email":
                    document.getElementById("inputPlayer-x").value = gameInfo[key];
                    document.querySelector("#btnJoin-x").disabled = true;
                break;
                case "user-o-email":
                    document.getElementById("inputPlayer-o").value = gameInfo[key];
                    document.querySelector("#btnJoin-o").disabled = true;
                break;

            }
            if(currentUser.displayName == null){
                currentUser.updateProfile({
                    displayName: "0",
                })
            }
            if(currentUser.displayName == gameInfo["user-o-email"] || currentUser.displayName == gameInfo["user-x-email"]){
                btnJoin[0].disabled = true;
                btnJoin[1].disabled = true; 
            }

            if(document.getElementById("inputPlayer-x").value != "" && document.getElementById("inputPlayer-o").value != ""){
                btnStart.disabled = false;
                document.getElementById("waiting").innerHTML = "START GAME";
                gameRef.child("game-1").update({
                    "gameStatus": "play",
                    "turn": gameInfo["user-x-email"],
                    "field-01": "",
                    "field-02": "",
                    "field-03": "",
                    "field-04": "",
                    "field-05": "",
                    "field-06": "",
                    "field-07": "",
                    "field-08": "",
                    "field-09": "",
                    "field-10": "",
                    "field-11": "",
                    "field-12": "",
                    "field-13": "",
                    "field-14": "",
                    "field-15": "",
                    "field-16": "",
                    "field-01-cach": "",
                    "field-02-cach": "",
                    "field-03-cach": "",
                    "field-04-cach": "",
                    "field-05-cach": "",
                    "field-06-cach": "",
                    "field-07-cach": "",
                    "field-08-cach": "",
                    "field-09-cach": "",
                    "field-10-cach": "",
                    "field-11-cach": "",
                    "field-12-cach": "",
                    "field-13-cach": "",
                    "field-14-cach": "",
                    "field-15-cach": "",
                    "field-16-cach": "",
                    "field-01-count": 0,
                    "field-02-count": 0,
                    "field-03-count": 0,
                    "field-04-count": 0,
                    "field-05-count": 0,
                    "field-06-count": 0,
                    "field-07-count": 0,
                    "field-08-count": 0,
                    "field-09-count": 0,
                    "field-10-count": 0,
                    "field-11-count": 0,
                    "field-12-count": 0,
                    "field-13-count": 0,
                    "field-14-count": 0,
                    "field-15-count": 0,
                    "field-16-count": 0,
                    "winner": "",
                    "loser": "",
                });
                window.location.replace("/GameModeMultiplayer.html");
            }
            else if(document.getElementById("inputPlayer-x").value == "" || document.getElementById("inputPlayer-o").value == ""){
                btnStart.disabled = true;
                document.getElementById("waiting").innerHTML = "Waiting for players..."
            }


            // if(gameInfo["gameStatus"] == 'play'){
            //     textPlayer();
            //     btnStart.disabled = true;
            //     document.getElementById("waiting").innerHTML = `Turn: ${gameInfo["turn"]}`;
            // }
        })
        
    })
    
}



btnStart.addEventListener("click", Startgame);

function Startgame(){
    alert();
}

