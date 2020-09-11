var teamNames = {
    "chennai-super-kings": {
        id: "csk",
        logo: "Chennai-Super-Kings-Logo-PNG.png"
    },
    "delhi-capitals": {
        id: "dc",
        logo: "Delhi-Daredevils-Logo-PNG.png",
    },
    "kings-xi-punjab": {
        id: "punjab",
        logo: "Kings-XI-Punjab-Logo-PNG.png",
    },
    "kolkata-knight-riders": {
        id: "kkr",
        logo: "Kolkata-Knight-Riders-Logo-PNG.png",
    },
    "mumbai-indians": {
        id: "mi",
        logo: "Mumbai-Indians-Logo-PNG.png",
    },
    "rajasthan-royals": {
        id: "rr",
        logo: "Rajasthan-Royals-Logo-PNG.png",
    },
    "sunrisers-hyderabad": {
        id: "srh",
        logo: "Sun-Risers-Logo-PNG.png"
    },
    "royal-challengers-bangalore": {
        id: "rcb",
        logo: "Royal-Challengers-Bangalore-Logo-PNG.png"
    }
}
async function fetchTeamData(url){
    let response = await fetch(url);
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
            toAdd.appendChild(name);
            var venue = document.createElement('div');
            venue.id = "venue";
            venue.innerHTML = team.venue;
            toAdd.appendChild(venue);
            if (team.winningYears.length) {
                var cups = document.createElement('div');
                cups.id = "cups";
                cups.innerHTML =  team.winningYears.toString();
                toAdd.appendChild(cups);
            }
            let teamData = document.getElementById(teamNames[team.id].id);
            teamData.insertBefore(toAdd,teamData.childNodes[0]);
        });
        document.getElementById("loader-div").style.display = "none";
        document.getElementById("teams").style.display = "flex";
    })
    
}