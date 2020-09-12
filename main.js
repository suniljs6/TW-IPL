const app = {
    init: function() {
        document.querySelectorAll('.change-team').forEach((link) => {
            link.addEventListener('click',app.nav);
        })
        history.replaceState({},'index.html','');
        window.addEventListener('popstate',app.poppin);
    },
    nav: function(ev) {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        history.pushState({}, currentPage, `${currentPage}`);
        viewTeam(currentPage);
    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
    }
}
document.addEventListener('DOMContentLoaded', app.init);
var teamNames = {
    "chennai-super-kings": {
        id: "csk",
    },
    "delhi-capitals": {
        id: "dc",
    },
    "kings-xi-punjab": {
        id: "punjab",
    },
    "kolkata-knight-riders": {
        id: "kkr",
    },
    "mumbai-indians": {
        id: "mi",
    },
    "rajasthan-royals": {
        id: "rr",
    },
    "sunrisers-hyderabad": {
        id: "srh",
    },
    "royal-challengers-bangalore": {
        id: "rcb",
    }
}
async function fetchTeamData(url){
    let response = await fetch("https://cors-anywhere.herokuapp.com/" +  url);
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
       
    }
}

function populateTeamData(){
    fetchTeamData("https://ipl-t20.herokuapp.com/teams").then(teams => {
        teams.forEach(team => {
            var toAdd = document.createDocumentFragment();
            var name = document.createElement('div');
            name.id = team.id;
            name.innerHTML = team.teamName;
            name.className += "team-name"
            toAdd.appendChild(name);
            var venue = document.createElement('div');
            venue.id = "venue";
            venue.innerHTML = team.venue;
            venue.className += "team-venue"
            toAdd.appendChild(venue);
            if (team.winningYears.length) {
                var cups = document.createElement('div');
                cups.id = "cups";
                cups.className += "team-cups"
                cups.innerHTML = "<i class='fa fa-trophy' style='color:yellow'></i> &nbsp"
                cups.innerHTML +=  team.winningYears.join(", ");;
                toAdd.appendChild(cups);
            }
            let teamData = document.getElementById(teamNames[team.id].id);
            teamData.insertBefore(toAdd,teamData.childNodes[2]);
        });
        document.getElementById("loader-div").style.display = "none";
        document.getElementById("teams-div").style.display = "flex";
    })
    
}

function getTeamID(id) {
    return Object.keys(teamNames).find(key => teamNames[key].id === id);
}

function isCaption(captainId,playerId){
    return captainId === playerId;
}

function isWicketKeeper(wicketKeeperId, playerId){
    return wicketKeeperId === playerId;
}

function viewTeam(team) {
    document.getElementById("loader-div").style.display = "flex";
    document.getElementById("teams-div").style.display = "none";
    fetchTeamData("https://ipl-t20.herokuapp.com/teams/"+getTeamID(team)).then((players) => {
        console.log(players);
        document.getElementById("loader-div").style.display = "none";
        document.getElementById("team-detailed-view").style.display = "flex";
    })
}