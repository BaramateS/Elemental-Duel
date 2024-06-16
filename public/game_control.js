firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User :", user);
        // getList(user);
    }
    setupUI(user);
});

const leaderboardRef = firebase.database().ref("Leaderboard");
const matchRef = firebase.database().ref("Game");
var deck = [
    `<i id="hydro" class="bi bi-droplet-fill"></i>`,
    `<i id="pyro" class="bi bi-fire"></i>`,
    `<i id="dendro" class="bi bi-tree-fill"></i>`,
    `<i id="animo" class="bi bi-tropical-storm"></i>`
];

const fields = document.querySelectorAll(".table-block");
var cards = document.querySelectorAll(".player-card");
var selected_elemental;
var cach_elemental;
function setCardForStartGame() {
    for (let card of cards) {
        card.onclick = (event) => {
            let target_element = event.currentTarget;
            console.log(target_element);
            selected_elemental = target_element;
            cach_elemental = target_element;
            console.log(`You choose : ${selected_elemental.innerHTML}`);
        }
    }
}

setCardForStartGame();

// leaderboardRef.child(firebase.auth().currentUser.displayName).push({
//     Name: firebase.auth().currentUser.displayName,
//     WR: 0,
//     Score: 100,
// });

matchRef.on("value", (snapshot) => {
    getGameInfo(snapshot);
});

function getGameInfo(snapshot) {
    const currentUser = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        const gameInfo = data.val();
        Object.keys(gameInfo).forEach((key) => {
            switch (key) {
                case "user-x-email":
                    document.querySelector(".display-player1").innerHTML = gameInfo[key];
                    break;
                case "user-o-email":
                    document.querySelector(".display-player2").innerHTML = gameInfo[key];
                    break;
            }

            if (gameInfo["gameStatus"] == "play") {
                document.getElementById("turn-show").innerHTML = gameInfo["turn"];
                elementalFromClient();
            }

            document.getElementById("field-01").innerHTML = gameInfo["field-01"];
            document.getElementById("field-02").innerHTML = gameInfo["field-02"];
            document.getElementById("field-03").innerHTML = gameInfo["field-03"];
            document.getElementById("field-04").innerHTML = gameInfo["field-04"];
            document.getElementById("field-05").innerHTML = gameInfo["field-05"];
            document.getElementById("field-06").innerHTML = gameInfo["field-06"];
            document.getElementById("field-07").innerHTML = gameInfo["field-07"];
            document.getElementById("field-08").innerHTML = gameInfo["field-08"];
            document.getElementById("field-09").innerHTML = gameInfo["field-09"];
            document.getElementById("field-10").innerHTML = gameInfo["field-10"];
            document.getElementById("field-11").innerHTML = gameInfo["field-11"];
            document.getElementById("field-12").innerHTML = gameInfo["field-12"];
            document.getElementById("field-13").innerHTML = gameInfo["field-13"];
            document.getElementById("field-14").innerHTML = gameInfo["field-14"];
            document.getElementById("field-15").innerHTML = gameInfo["field-15"];
            document.getElementById("field-16").innerHTML = gameInfo["field-16"];

            if (gameInfo["field-01-count"] == 3) {
                document.getElementById("field-01").style.background = "#6E4880";
            }

            if (gameInfo["field-02-count"] == 3) {
                document.getElementById("field-02").style.background = "#6E4880";
            }

            if (gameInfo["field-03-count"] == 3) {
                document.getElementById("field-03").style.background = "#6E4880";
            }

            if (gameInfo["field-04-count"] == 3) {
                document.getElementById("field-04").style.background = "#6E4880";
            }

            if (gameInfo["field-05-count"] == 3) {
                document.getElementById("field-05").style.background = "#6E4880";
            }

            if (gameInfo["field-06-count"] == 3) {
                document.getElementById("field-06").style.background = "#6E4880";
            }

            if (gameInfo["field-07-count"] == 3) {
                document.getElementById("field-07").style.background = "#6E4880";
            }

            if (gameInfo["field-08-count"] == 3) {
                document.getElementById("field-08").style.background = "#6E4880";
            }

            if (gameInfo["field-09-count"] == 3) {
                document.getElementById("field-09").style.background = "#6E4880";
            }

            if (gameInfo["field-10-count"] == 3) {
                document.getElementById("field-10").style.background = "#6E4880";
            }

            if (gameInfo["field-11-count"] == 3) {
                document.getElementById("field-11").style.background = "#6E4880";
            }

            if (gameInfo["field-12-count"] == 3) {
                document.getElementById("field-12").style.background = "#6E4880";
            }

            if (gameInfo["field-13-count"] == 3) {
                document.getElementById("field-13").style.background = "#6E4880";
            }

            if (gameInfo["field-14-count"] == 3) {
                document.getElementById("field-14").style.background = "#6E4880";
            }

            if (gameInfo["field-15-count"] == 3) {
                document.getElementById("field-15").style.background = "#6E4880";
            }

            if (gameInfo["field-16-count"] == 3) {
                document.getElementById("field-16").style.background = "#6E4880";
            }

            checkGameResult();

            if (gameInfo["gameStatus"] == "stop") {
                if (gameInfo["turn"] == gameInfo["user-x-email"]) {
                    leaderboardRef.child(gameInfo["user-o-email"]).once("value", (snapshot) => {
                        const user = snapshot.val();
                        const wins = user ? user.Wins + 1 : 1;
                        const loss = user ? user.loss : 0;
                        const score = user ? user.Score + 100 : 100;
                        const WR = Math.round((wins / (wins + loss)) * 100);
                        leaderboardRef.child(gameInfo["user-o-email"]).set({
                            Name: gameInfo["user-o-email"],
                            Score: score,
                            Wins: wins,
                            loss: loss,
                            WR: WR,
                        });
                    });

                    leaderboardRef.child(gameInfo["user-x-email"]).once("value", (snapshot) => {
                        const user = snapshot.val();
                        const wins = user ? user.Wins : 0;
                        const loss = user ? user.loss + 1: 1;
                        const score = user ? user.Score : 0;
                        const WR = Math.round((wins / (wins + loss)) * 100);
                        leaderboardRef.child(gameInfo["user-x-email"]).set({
                            Name: gameInfo["user-x-email"],
                            Score: score,
                            Wins: wins,
                            loss: loss,
                            WR: WR,
                        });
                    });
                    setTimeout(() => {
                        document.getElementById("result-game").style.display = "initial";
                        document.getElementById("result-win-lose").innerHTML = `Winner is ${gameInfo["user-o-email"]}`;
                        document.getElementById("run-game").style.display = "none";
                    }, 3000);
                } else if (gameInfo["turn"] == gameInfo["user-o-email"]) {
                    // if (gameInfo["user-x-email"] == currentUser.displayName) {
                    //     currentUser.updateProfile({
                    //         Score: 100,
                    //         wins: 1,
                    //         loss: 0,
                    //         // WR: (wins / (wins + loss)) * 100,
                    //     });
                    // }
                    leaderboardRef.child(gameInfo["user-x-email"]).once("value", (snapshot) => {
                        const user = snapshot.val();
                        const wins = user ? user.Wins + 1 : 1;
                        const loss = user ? user.loss : 0;
                        const score = user ? user.Score + 100 : 100;
                        const WR = Math.round((wins / (wins + loss)) * 100);
                        leaderboardRef.child(gameInfo["user-x-email"]).set({
                            Name: gameInfo["user-x-email"],
                            Score: score,
                            Wins: wins,
                            loss: loss,
                            WR: WR,
                        });
                    });

                    leaderboardRef.child(gameInfo["user-o-email"]).once("value", (snapshot) => {
                        const user = snapshot.val();
                        const wins = user ? user.Wins : 0;
                        const loss = user ? user.loss + 1 : 1;
                        const score = user ? user.Score : 0;
                        const WR = Math.round((wins / (wins + loss)) * 100);
                        leaderboardRef.child(gameInfo["user-o-email"]).set({
                            Name: gameInfo["user-o-email"],
                            Score: score,
                            Wins: wins,
                            loss: loss,
                            WR: WR,
                        });
                    });
                    
                    setTimeout(() => {
                        document.getElementById("result-game").style.display = "initial";
                        document.getElementById("result-win-lose").innerHTML = `Winner is ${gameInfo["user-x-email"]}`;
                        document.getElementById("run-game").style.display = "none";
                    }, 3000);
                }

                const btnToMenu = document.getElementById("btnToMenu");
                btnToMenu.addEventListener("click", () => {
                    matchRef.child("game-1").remove();
                    window.location.replace("/MainMenu.html");
                });
            }
            // } else if (gameInfo["gameStatus"] == "stop" && gameInfo["turn"] == gameInfo["user-o-email"]) {
            //     setTimeout(() => {
            //         document.getElementById("result-game").style.display = "initial";
            //         document.getElementById("result-win-lose").innerHTML = `Winner is ${gameInfo["user-x-email"]}`;
            //         document.getElementById("run-game").style.display = "none";
            //     }, 3000);

            //     const btnToMenu = document.getElementById("btnToMenu");
            //     btnToMenu.addEventListener("click", () => {
            //         matchRef.child("game-1").remove();
            //         window.location.replace("/MainMenu.html");
            //     });
            // }

            if (gameInfo["field-01-count"] + gameInfo["field-02-count"] + gameInfo["field-03-count"] + gameInfo["field-04-count"] + gameInfo["field-05-count"] + gameInfo["field-06-count"] + gameInfo["field-07-count"] + gameInfo["field-08-count"] + gameInfo["field-09-count"] + gameInfo["field-10-count"] + gameInfo["field-11-count"] + gameInfo["field-12-count"] + gameInfo["field-13-count"] + gameInfo["field-14-count"] + gameInfo["field-15-count"] + gameInfo["field-16-count"] == 48) {
                document.getElementById("draw-pop").style.display = "flex";
                setTimeout(() => {
                    matchRef.child("game-1").update({
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
                    });
                    document.getElementById("draw-pop").style.display = "none";
                }, 3000);

                document.getElementById("field-01").style.background = "none";
                document.getElementById("field-02").style.background = "none";
                document.getElementById("field-03").style.background = "none";
                document.getElementById("field-04").style.background = "none";
                document.getElementById("field-05").style.background = "none";
                document.getElementById("field-06").style.background = "none";
                document.getElementById("field-07").style.background = "none";
                document.getElementById("field-08").style.background = "none";
                document.getElementById("field-09").style.background = "none";
                document.getElementById("field-10").style.background = "none";
                document.getElementById("field-11").style.background = "none";
                document.getElementById("field-12").style.background = "none";
                document.getElementById("field-13").style.background = "none";
                document.getElementById("field-14").style.background = "none";
                document.getElementById("field-15").style.background = "none";
                document.getElementById("field-16").style.background = "none";
            }

        });

        function checkGameResult() {
            if (allEqual([gameInfo["field-01"], gameInfo["field-02"], gameInfo["field-03"], gameInfo["field-04"]])) {

                matchRef.child("game-1").update({
                    "gameStatus": "stop",
                });

                document.getElementById("field-01").style.background = "#428826";
                document.getElementById("field-02").style.background = "#428826";
                document.getElementById("field-03").style.background = "#428826";
                document.getElementById("field-04").style.background = "#428826";
                fields.forEach((field) => field.removeEventListener("click", showOnField));
                return true;

            } else if (allEqual([gameInfo["field-05"], gameInfo["field-06"], gameInfo["field-07"], gameInfo["field-08"]])) {

                matchRef.child("game-1").update({
                    "gameStatus": "stop",
                });

                document.getElementById("field-05").style.background = "#428826";
                document.getElementById("field-06").style.background = "#428826";
                document.getElementById("field-07").style.background = "#428826";
                document.getElementById("field-08").style.background = "#428826";
                fields.forEach((field) => field.removeEventListener("click", showOnField));
                return true;

            } else if (allEqual([gameInfo["field-09"], gameInfo["field-10"], gameInfo["field-11"], gameInfo["field-12"]])) {

                matchRef.child("game-1").update({
                    "gameStatus": "stop",
                });

                document.getElementById("field-09").style.background = "#428826";
                document.getElementById("field-10").style.background = "#428826";
                document.getElementById("field-11").style.background = "#428826";
                document.getElementById("field-12").style.background = "#428826";
                fields.forEach((field) => field.removeEventListener("click", showOnField));
                return true;

            } else if (allEqual([gameInfo["field-13"], gameInfo["field-14"], gameInfo["field-15"], gameInfo["field-16"]])) {

                matchRef.child("game-1").update({
                    "gameStatus": "stop",
                });

                document.getElementById("field-13").style.background = "#428826";
                document.getElementById("field-14").style.background = "#428826";
                document.getElementById("field-15").style.background = "#428826";
                document.getElementById("field-16").style.background = "#428826";
                fields.forEach((field) => field.removeEventListener("click", showOnField));
                return true;

            } else if (allEqual([gameInfo["field-01"], gameInfo["field-05"], gameInfo["field-09"], gameInfo["field-13"]])) {

                matchRef.child("game-1").update({
                    "gameStatus": "stop",
                });

                document.getElementById("field-01").style.background = "#428826";
                document.getElementById("field-05").style.background = "#428826";
                document.getElementById("field-09").style.background = "#428826";
                document.getElementById("field-13").style.background = "#428826";
                fields.forEach((field) => field.removeEventListener("click", showOnField));
                return true;

            } else if (allEqual([gameInfo["field-02"], gameInfo["field-06"], gameInfo["field-10"], gameInfo["field-14"]])) {

                matchRef.child("game-1").update({
                    "gameStatus": "stop",
                });

                document.getElementById("field-02").style.background = "#428826";
                document.getElementById("field-06").style.background = "#428826";
                document.getElementById("field-10").style.background = "#428826";
                document.getElementById("field-14").style.background = "#428826";
                fields.forEach((field) => field.removeEventListener("click", showOnField));
                return true;

            } else if (allEqual([gameInfo["field-03"], gameInfo["field-07"], gameInfo["field-11"], gameInfo["field-15"]])) {

                matchRef.child("game-1").update({
                    "gameStatus": "stop",
                });

                document.getElementById("field-03").style.background = "#428826";
                document.getElementById("field-07").style.background = "#428826";
                document.getElementById("field-11").style.background = "#428826";
                document.getElementById("field-15").style.background = "#428826";
                fields.forEach((field) => field.removeEventListener("click", showOnField));
                return true;

            } else if (allEqual([gameInfo["field-04"], gameInfo["field-08"], gameInfo["field-12"], gameInfo["field-16"]])) {

                matchRef.child("game-1").update({
                    "gameStatus": "stop",
                });

                document.getElementById("field-04").style.background = "#428826";
                document.getElementById("field-08").style.background = "#428826";
                document.getElementById("field-12").style.background = "#428826";
                document.getElementById("field-16").style.background = "#428826";
                fields.forEach((field) => field.removeEventListener("click", showOnField));
                return true;

            } else if (allEqual([gameInfo["field-01"], gameInfo["field-06"], gameInfo["field-11"], gameInfo["field-16"]])) {

                matchRef.child("game-1").update({
                    "gameStatus": "stop",
                });

                document.getElementById("field-01").style.background = "#428826";
                document.getElementById("field-06").style.background = "#428826";
                document.getElementById("field-11").style.background = "#428826";
                document.getElementById("field-16").style.background = "#428826";
                fields.forEach((field) => field.removeEventListener("click", showOnField));
                return true;

            } else if (allEqual([gameInfo["field-04"], gameInfo["field-07"], gameInfo["field-10"], gameInfo["field-13"]])) {

                matchRef.child("game-1").update({
                    "gameStatus": "stop",
                });

                document.getElementById("field-04").style.background = "#428826";
                document.getElementById("field-07").style.background = "#428826";
                document.getElementById("field-10").style.background = "#428826";
                document.getElementById("field-13").style.background = "#428826";
                fields.forEach((field) => field.removeEventListener("click", showOnField));
                return true;

            }
        }

        function allEqual(arry) {
            const result = arry.every(element => {
                if (element === arry[0] && element !== "") {
                    return true;
                }
            });

            return result;
        }
    });

}

function elementalFromClient() {
    fields.forEach((field) => field.addEventListener("click", showOnField));
}

function showOnField(event) {
    const currentUser = firebase.auth().currentUser;

    matchRef.once("value", (snapshot) => {
        clickOnField(snapshot);
    });

    function clickOnField(snapshot) {
        snapshot.forEach((data) => {
            const gameInfo = data.val();
            if (gameInfo["turn"] == gameInfo["user-x-email"] && gameInfo["user-x-email"] == currentUser.displayName && event.currentTarget.innerHTML == "") {
                if (event.currentTarget.getAttribute("id") == "field-01") {
                    // push data to server
                    if (gameInfo["field-01-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-01": selected_elemental.innerHTML,
                            "field-01-cach": selected_elemental.innerHTML,
                            "field-01-count": gameInfo["field-01-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-02") {
                    // push data to server
                    if (gameInfo["field-02-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-02": selected_elemental.innerHTML,
                            "field-02-cach": selected_elemental.innerHTML,
                            "field-02-count": gameInfo["field-02-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-03") {
                    // push data to server
                    if (gameInfo["field-03-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-03": selected_elemental.innerHTML,
                            "field-03-cach": selected_elemental.innerHTML,
                            "field-03-count": gameInfo["field-03-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-04") {
                    // push data to server
                    if (gameInfo["field-04-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-04": selected_elemental.innerHTML,
                            "field-04-cach": selected_elemental.innerHTML,
                            "field-04-count": gameInfo["field-04-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-05") {
                    // push data to server
                    if (gameInfo["field-05-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-05": selected_elemental.innerHTML,
                            "field-05-cach": selected_elemental.innerHTML,
                            "field-05-count": gameInfo["field-05-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-06") {
                    // push data to server
                    if (gameInfo["field-06-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-06": selected_elemental.innerHTML,
                            "field-06-cach": selected_elemental.innerHTML,
                            "field-06-count": gameInfo["field-06-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-07") {
                    // push data to server
                    if (gameInfo["field-07-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-07": selected_elemental.innerHTML,
                            "field-07-cach": selected_elemental.innerHTML,
                            "field-07-count": gameInfo["field-07-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-08") {
                    // push data to server
                    if (gameInfo["field-08-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-08": selected_elemental.innerHTML,
                            "field-08-cach": selected_elemental.innerHTML,
                            "field-08-count": gameInfo["field-08-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-09") {
                    // push data to server
                    if (gameInfo["field-09-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-09": selected_elemental.innerHTML,
                            "field-09-cach": selected_elemental.innerHTML,
                            "field-09-count": gameInfo["field-09-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-10") {
                    // push data to server
                    if (gameInfo["field-10-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-10": selected_elemental.innerHTML,
                            "field-10-cach": selected_elemental.innerHTML,
                            "field-10-count": gameInfo["field-10-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-11") {
                    // push data to server
                    if (gameInfo["field-11-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-11": selected_elemental.innerHTML,
                            "field-11-cach": selected_elemental.innerHTML,
                            "field-11-count": gameInfo["field-11-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-12") {
                    // push data to server
                    if (gameInfo["field-12-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-12": selected_elemental.innerHTML,
                            "field-12-cach": selected_elemental.innerHTML,
                            "field-12-count": gameInfo["field-12-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-13") {
                    // push data to server
                    if (gameInfo["field-13-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-13": selected_elemental.innerHTML,
                            "field-13-cach": selected_elemental.innerHTML,
                            "field-13-count": gameInfo["field-13-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-14") {
                    // push data to server
                    if (gameInfo["field-14-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-14": selected_elemental.innerHTML,
                            "field-14-cach": selected_elemental.innerHTML,
                            "field-14-count": gameInfo["field-14-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-15") {
                    // push data to server
                    if (gameInfo["field-15-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-15": selected_elemental.innerHTML,
                            "field-15-cach": selected_elemental.innerHTML,
                            "field-15-count": gameInfo["field-15-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-16") {
                    // push data to server
                    if (gameInfo["field-16-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-16": selected_elemental.innerHTML,
                            "field-16-cach": selected_elemental.innerHTML,
                            "field-16-count": gameInfo["field-16-count"] + 1,
                            "turn": gameInfo["user-o-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }
            } else if (gameInfo["turn"] == gameInfo["user-x-email"] && gameInfo["user-x-email"] == currentUser.displayName && event.currentTarget.innerHTML != "") {
                if (event.currentTarget.getAttribute("id") == "field-01") {
                    // Check Rules
                    if (gameInfo["field-01-count"] < 3) {
                        if (isCanReplace(gameInfo["field-01"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-01": selected_elemental.innerHTML,
                                "field-01-cach": selected_elemental.innerHTML,
                                "field-01-count": gameInfo["field-01-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-02") {
                    // Check Rules
                    if (gameInfo["field-02-count"] < 3) {
                        if (isCanReplace(gameInfo["field-02"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-02": selected_elemental.innerHTML,
                                "field-02-cach": selected_elemental.innerHTML,
                                "field-02-count": gameInfo["field-02-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-03") {
                    // Check Rules
                    if (gameInfo["field-03-count"] < 3) {
                        if (isCanReplace(gameInfo["field-03"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-03": selected_elemental.innerHTML,
                                "field-03-cach": selected_elemental.innerHTML,
                                "field-03-count": gameInfo["field-03-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-04") {
                    // Check Rules
                    if (gameInfo["field-04-count"] < 3) {
                        if (isCanReplace(gameInfo["field-04"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-04": selected_elemental.innerHTML,
                                "field-04-cach": selected_elemental.innerHTML,
                                "field-04-count": gameInfo["field-04-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-05") {
                    // Check Rules
                    if (gameInfo["field-05-count"] < 3) {
                        if (isCanReplace(gameInfo["field-05"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-05": selected_elemental.innerHTML,
                                "field-05-cach": selected_elemental.innerHTML,
                                "field-05-count": gameInfo["field-05-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-06") {
                    // Check Rules
                    if (gameInfo["field-06-count"] < 3) {
                        if (isCanReplace(gameInfo["field-06"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-06": selected_elemental.innerHTML,
                                "field-06-cach": selected_elemental.innerHTML,
                                "field-06-count": gameInfo["field-06-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-07") {
                    // Check Rules
                    if (gameInfo["field-07-count"] < 3) {
                        if (isCanReplace(gameInfo["field-07"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-07": selected_elemental.innerHTML,
                                "field-07-cach": selected_elemental.innerHTML,
                                "field-07-count": gameInfo["field-07-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-08") {
                    // Check Rules
                    if (gameInfo["field-08-count"] < 3) {
                        if (isCanReplace(gameInfo["field-08"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-08": selected_elemental.innerHTML,
                                "field-08-cach": selected_elemental.innerHTML,
                                "field-08-count": gameInfo["field-08-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-09") {
                    // Check Rules
                    if (gameInfo["field-09-count"] < 3) {
                        if (isCanReplace(gameInfo["field-09"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-09": selected_elemental.innerHTML,
                                "field-09-cach": selected_elemental.innerHTML,
                                "field-09-count": gameInfo["field-09-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-10") {
                    // Check Rules
                    if (gameInfo["field-10-count"] < 3) {
                        if (isCanReplace(gameInfo["field-10"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-10": selected_elemental.innerHTML,
                                "field-10-cach": selected_elemental.innerHTML,
                                "field-10-count": gameInfo["field-10-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-11") {
                    // Check Rules
                    if (gameInfo["field-11-count"] < 3) {
                        if (isCanReplace(gameInfo["field-11"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-11": selected_elemental.innerHTML,
                                "field-11-cach": selected_elemental.innerHTML,
                                "field-11-count": gameInfo["field-11-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-12") {
                    // Check Rules
                    if (gameInfo["field-12-count"] < 3) {
                        if (isCanReplace(gameInfo["field-12"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-12": selected_elemental.innerHTML,
                                "field-12-cach": selected_elemental.innerHTML,
                                "field-12-count": gameInfo["field-12-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-13") {
                    // Check Rules
                    if (gameInfo["field-13-count"] < 3) {
                        if (isCanReplace(gameInfo["field-13"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-13": selected_elemental.innerHTML,
                                "field-13-cach": selected_elemental.innerHTML,
                                "field-13-count": gameInfo["field-13-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-14") {
                    // Check Rules
                    if (gameInfo["field-14-count"] < 3) {
                        if (isCanReplace(gameInfo["field-14"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-14": selected_elemental.innerHTML,
                                "field-14-cach": selected_elemental.innerHTML,
                                "field-14-count": gameInfo["field-14-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-15") {
                    // Check Rules
                    if (gameInfo["field-15-count"] < 3) {
                        if (isCanReplace(gameInfo["field-15"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-15": selected_elemental.innerHTML,
                                "field-15-cach": selected_elemental.innerHTML,
                                "field-15-count": gameInfo["field-15-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-16") {
                    // Check Rules
                    if (gameInfo["field-16-count"] < 3) {
                        if (isCanReplace(gameInfo["field-16"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-16": selected_elemental.innerHTML,
                                "field-16-cach": selected_elemental.innerHTML,
                                "field-16-count": gameInfo["field-16-count"] + 1,
                                "turn": gameInfo["user-o-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }
            }

            // Player O

            if (gameInfo["turn"] == gameInfo["user-o-email"] && gameInfo["user-o-email"] == currentUser.displayName && event.currentTarget.innerHTML == "") {
                if (event.currentTarget.getAttribute("id") == "field-01") {
                    // push data to server
                    if (gameInfo["field-01-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-01": selected_elemental.innerHTML,
                            "field-01-cach": selected_elemental.innerHTML,
                            "field-01-count": gameInfo["field-01-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-02") {
                    // push data to server
                    if (gameInfo["field-02-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-02": selected_elemental.innerHTML,
                            "field-02-cach": selected_elemental.innerHTML,
                            "field-02-count": gameInfo["field-02-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-03") {
                    // push data to server
                    if (gameInfo["field-03-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-03": selected_elemental.innerHTML,
                            "field-03-cach": selected_elemental.innerHTML,
                            "field-03-count": gameInfo["field-03-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-04") {
                    // push data to server
                    if (gameInfo["field-04-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-04": selected_elemental.innerHTML,
                            "field-04-cach": selected_elemental.innerHTML,
                            "field-04-count": gameInfo["field-04-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-05") {
                    // push data to server
                    if (gameInfo["field-05-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-05": selected_elemental.innerHTML,
                            "field-05-cach": selected_elemental.innerHTML,
                            "field-05-count": gameInfo["field-05-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-06") {
                    // push data to server
                    if (gameInfo["field-06-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-06": selected_elemental.innerHTML,
                            "field-06-cach": selected_elemental.innerHTML,
                            "field-06-count": gameInfo["field-06-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-07") {
                    // push data to server
                    if (gameInfo["field-07-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-07": selected_elemental.innerHTML,
                            "field-07-cach": selected_elemental.innerHTML,
                            "field-07-count": gameInfo["field-07-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-08") {
                    // push data to server
                    if (gameInfo["field-08-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-08": selected_elemental.innerHTML,
                            "field-08-cach": selected_elemental.innerHTML,
                            "field-08-count": gameInfo["field-08-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-09") {
                    // push data to server
                    if (gameInfo["field-09-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-09": selected_elemental.innerHTML,
                            "field-09-cach": selected_elemental.innerHTML,
                            "field-09-count": gameInfo["field-09-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-10") {
                    // push data to server
                    if (gameInfo["field-10-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-10": selected_elemental.innerHTML,
                            "field-10-cach": selected_elemental.innerHTML,
                            "field-10-count": gameInfo["field-10-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-11") {
                    // push data to server
                    if (gameInfo["field-11-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-11": selected_elemental.innerHTML,
                            "field-11-cach": selected_elemental.innerHTML,
                            "field-11-count": gameInfo["field-11-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-12") {
                    // push data to server
                    if (gameInfo["field-12-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-12": selected_elemental.innerHTML,
                            "field-12-cach": selected_elemental.innerHTML,
                            "field-12-count": gameInfo["field-12-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-13") {
                    // push data to server
                    if (gameInfo["field-13-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-13": selected_elemental.innerHTML,
                            "field-13-cach": selected_elemental.innerHTML,
                            "field-13-count": gameInfo["field-13-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-14") {
                    // push data to server
                    if (gameInfo["field-14-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-14": selected_elemental.innerHTML,
                            "field-14-cach": selected_elemental.innerHTML,
                            "field-14-count": gameInfo["field-14-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-15") {
                    // push data to server
                    if (gameInfo["field-15-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-15": selected_elemental.innerHTML,
                            "field-15-cach": selected_elemental.innerHTML,
                            "field-15-count": gameInfo["field-15-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-16") {
                    // push data to server
                    if (gameInfo["field-16-count"] < 3) {

                        matchRef.child("game-1").update({
                            "field-16": selected_elemental.innerHTML,
                            "field-16-cach": selected_elemental.innerHTML,
                            "field-16-count": gameInfo["field-16-count"] + 1,
                            "turn": gameInfo["user-x-email"],
                        });

                        selected_elemental = "";
                        cach_elemental.innerHTML = "";
                        drawcardOnClient();

                    }
                }
            } else if (gameInfo["turn"] == gameInfo["user-o-email"] && gameInfo["user-o-email"] == currentUser.displayName && event.currentTarget.innerHTML != "") {
                if (event.currentTarget.getAttribute("id") == "field-01") {
                    // Check Rules
                    if (gameInfo["field-01-count"] < 3) {
                        if (isCanReplace(gameInfo["field-01"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-01": selected_elemental.innerHTML,
                                "field-01-cach": selected_elemental.innerHTML,
                                "field-01-count": gameInfo["field-01-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-02") {
                    // Check Rules
                    if (gameInfo["field-02-count"] < 3) {
                        if (isCanReplace(gameInfo["field-02"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-02": selected_elemental.innerHTML,
                                "field-02-cach": selected_elemental.innerHTML,
                                "field-02-count": gameInfo["field-02-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-03") {
                    // Check Rules
                    if (gameInfo["field-03-count"] < 3) {
                        if (isCanReplace(gameInfo["field-03"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-03": selected_elemental.innerHTML,
                                "field-03-cach": selected_elemental.innerHTML,
                                "field-03-count": gameInfo["field-03-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-04") {
                    // Check Rules
                    if (gameInfo["field-04-count"] < 3) {
                        if (isCanReplace(gameInfo["field-04"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-04": selected_elemental.innerHTML,
                                "field-04-cach": selected_elemental.innerHTML,
                                "field-04-count": gameInfo["field-04-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-05") {
                    // Check Rules
                    if (gameInfo["field-05-count"] < 3) {
                        if (isCanReplace(gameInfo["field-05"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-05": selected_elemental.innerHTML,
                                "field-05-cach": selected_elemental.innerHTML,
                                "field-05-count": gameInfo["field-05-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-06") {
                    // Check Rules
                    if (gameInfo["field-06-count"] < 3) {
                        if (isCanReplace(gameInfo["field-06"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-06": selected_elemental.innerHTML,
                                "field-06-cach": selected_elemental.innerHTML,
                                "field-06-count": gameInfo["field-06-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-07") {
                    // Check Rules
                    if (gameInfo["field-07-count"] < 3) {
                        if (isCanReplace(gameInfo["field-07"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-07": selected_elemental.innerHTML,
                                "field-07-cach": selected_elemental.innerHTML,
                                "field-07-count": gameInfo["field-07-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-08") {
                    // Check Rules
                    if (gameInfo["field-08-count"] < 3) {
                        if (isCanReplace(gameInfo["field-08"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-08": selected_elemental.innerHTML,
                                "field-08-cach": selected_elemental.innerHTML,
                                "field-08-count": gameInfo["field-08-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-09") {
                    // Check Rules
                    if (gameInfo["field-09-count"] < 3) {
                        if (isCanReplace(gameInfo["field-09"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-09": selected_elemental.innerHTML,
                                "field-09-cach": selected_elemental.innerHTML,
                                "field-09-count": gameInfo["field-09-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-10") {
                    // Check Rules
                    if (gameInfo["field-10-count"] < 3) {
                        if (isCanReplace(gameInfo["field-10"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-10": selected_elemental.innerHTML,
                                "field-10-cach": selected_elemental.innerHTML,
                                "field-10-count": gameInfo["field-10-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-11") {
                    // Check Rules
                    if (gameInfo["field-11-count"] < 3) {
                        if (isCanReplace(gameInfo["field-11"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-11": selected_elemental.innerHTML,
                                "field-11-cach": selected_elemental.innerHTML,
                                "field-11-count": gameInfo["field-11-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-12") {
                    // Check Rules
                    if (gameInfo["field-12-count"] < 3) {
                        if (isCanReplace(gameInfo["field-12"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-12": selected_elemental.innerHTML,
                                "field-12-cach": selected_elemental.innerHTML,
                                "field-12-count": gameInfo["field-12-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-13") {
                    // Check Rules
                    if (gameInfo["field-13-count"] < 3) {
                        if (isCanReplace(gameInfo["field-13"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-13": selected_elemental.innerHTML,
                                "field-13-cach": selected_elemental.innerHTML,
                                "field-13-count": gameInfo["field-13-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-14") {
                    // Check Rules
                    if (gameInfo["field-14-count"] < 3) {
                        if (isCanReplace(gameInfo["field-14"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-14": selected_elemental.innerHTML,
                                "field-14-cach": selected_elemental.innerHTML,
                                "field-14-count": gameInfo["field-14-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-15") {
                    // Check Rules
                    if (gameInfo["field-15-count"] < 3) {
                        if (isCanReplace(gameInfo["field-15"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-15": selected_elemental.innerHTML,
                                "field-15-cach": selected_elemental.innerHTML,
                                "field-15-count": gameInfo["field-15-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }

                if (event.currentTarget.getAttribute("id") == "field-16") {
                    // Check Rules
                    if (gameInfo["field-16-count"] < 3) {
                        if (isCanReplace(gameInfo["field-16"], selected_elemental.innerHTML)) {

                            matchRef.child("game-1").update({
                                "field-16": selected_elemental.innerHTML,
                                "field-16-cach": selected_elemental.innerHTML,
                                "field-16-count": gameInfo["field-16-count"] + 1,
                                "turn": gameInfo["user-x-email"],
                            });

                            selected_elemental = "";
                            cach_elemental.innerHTML = "";

                            drawcardOnClient();

                        }
                    }
                }
            }

        });
    }

}
function isCanReplace(oldEle, newEle) {
    if (oldEle == `<i id="dendro" class="bi bi-tree-fill"></i>` && newEle == `<i id="pyro" class="bi bi-fire"></i>`) {
        return true;
    } else if (oldEle == `<i id="animo" class="bi bi-tropical-storm"></i>` && newEle == `<i id="dendro" class="bi bi-tree-fill"></i>`) {
        return true;
    } else if (oldEle == `<i id="hydro" class="bi bi-droplet-fill"></i>` && newEle == `<i id="animo" class="bi bi-tropical-storm"></i>`) {
        return true;
    } else if (oldEle == `<i id="pyro" class="bi bi-fire"></i>` && newEle == `<i id="hydro" class="bi bi-droplet-fill"></i>`) {
        return true;
    }
}

function randomCardSymbol(arry) {
    return arry[Math.floor(Math.random() * arry.length)];
}

function drawcardOnClient() {
    // var cards = document.querySelectorAll(".player-card");
    for (let hand of cards) {
        if (hand.innerHTML == "") {
            hand.innerHTML = randomCardSymbol(deck);
        }
    }
}