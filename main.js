const app = {
    init: function() {
        document.querySelectorAll('.change-team').forEach((link) => {
            link.addEventListener('click',app.nav);
        })
       // history.replaceState({},'index.html','');
        window.addEventListener('popstate',app.poppin);
    },
    nav: function(ev) {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        //history.pushState({}, currentPage, `${currentPage}`);
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
        logo: "Chennai-Super-Kings-Logo-PNG.png",
        celebrationImage: "csk-celebrations.jpg",
        color: "#F9CD05",
        venue: "",
        cups : "",
    },
    "delhi-capitals": {
        id: "dc",
        logo: "Delhi-Daredevils-Logo-PNG.png",
        celebrationImage: "dc-celebrations.jpg",
        color: "#00008B",
        venue: "",
        cups : "",
    },
    "kings-xi-punjab": {
        id: "punjab",
        logo: "Kings-XI-Punjab-Logo-PNG.png",
        celebrationImage: "punjab-celebrations.jpg",
        color: "#ED1B24",
        venue: "",
        cups : "",
    },
    "kolkata-knight-riders": {
        id: "kkr",
        logo: "Kolkata-Knight-Riders-Logo-PNG.png",
        celebrationImage: "kkr-celebrations.jpg",
        color: "#2E0854",
        venue: "",
        cups : "",
    },
    "mumbai-indians": {
        id: "mi",
        logo: "Mumbai-Indians-Logo-PNG.png",
        celebrationImage: "mi-celebrations.jpg",
        color: " #004BA0",
        venue: "",
        cups : "",
    },
    "rajasthan-royals": {
        id: "rr",
        logo: "Rajasthan-Royals-Logo-PNG.png",
        celebrationImage: "rr-celebrations.jpg",
        color: "#254AA5",
        venue: "",
        cups : "",
    },
    "sunrisers-hyderabad": {
        id: "srh",
        logo: "Sun-Risers-Logo-PNG.png",
        celebrationImage: "srh-celebrations.jpg",
        color: "#FF822A",
        venue: "",
        cups : "",
    },
    "royal-challengers-bangalore": {
        id: "rcb",
        logo: "Royal-Challengers-Bangalore-Logo-PNG.png",
        celebrationImage: "Royal-Challengers-Bangalore-Logo-PNG.png",
        color: " #2B2A29",
        venue: "",
        cups : "",
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
            teamNames[team.id].venue = team.venue;
            venue.className += "team-venue"
            toAdd.appendChild(venue);
            if (team.winningYears.length) {
                var cups = document.createElement('div');
                cups.id = "cups";
                cups.className += "team-cups"
                cups.innerHTML = "<i class='fa fa-trophy' style='color:yellow'></i> &nbsp"
                cups.innerHTML +=  team.winningYears.join(", ");
                teamNames[team.id].cups = team.winningYears.join(", ");
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

function populatePlayerStats(stat,text){
    var stats = document.createElement('div');
        var statsKind = document.createElement('h3');
        statsKind .innerHTML = stat;
        stats.appendChild(statsKind );
        var statText = document.createElement('span');
        statText.innerHTML = text;
        stats.appendChild(statText);
    return stats
}

function viewTeam(team) {
    document.getElementById("loader-div").style.display = "flex";
    document.getElementById("teams-div").style.display = "none";
    let teamId = getTeamID(team)
    fetchTeamData("https://ipl-t20.herokuapp.com/teams/"+teamId).then((players) => {
        console.log(players);
        var captainId = players.team.captainId;
        var wicketKeeperId = players.team.wicketKeeperId;
        var toAdd = document.createDocumentFragment();
        var teamBanner = document.createElement('div');
        teamBanner.id = "teamBanner";
        teamBanner.className += "team-banner"
        const backgroundImage = "images/" + teamNames[teamId].celebrationImage;
        teamBanner.style.backgroundImage = "url(" + backgroundImage + ")";
        teamBanner.style.backgroundColor = teamNames[teamId].color;
            var teamBannerDiv = document.createElement('div');
                teamBannerDiv.className += "team-banner-div"
                var img = document.createElement('img');
                img.src = "images/"+teamNames[teamId].logo;
                teamBannerDiv.appendChild(img);
                var teamDataDiv = document.createElement('div');
                    teamDataDiv.className += "team-data-div"
                    var teamName = document.createElement('h3');
                    teamName.innerHTML = teamId;
                    teamName.style.fontSize = "2em";
                    teamDataDiv.appendChild(teamName);
                    if (teamNames[teamId].cups.length) {
                        var cups = document.createElement('div');
                        cups.innerHTML = "<i class='fa fa-trophy' style='color:black'></i> &nbsp"
                        cups.innerHTML += teamNames[teamId].cups;
                        cups.style.fontSize = "1em";
                        cups.style.fontWeight = "bolder";
                        teamDataDiv.appendChild(cups);
                    }
                    var venue = document.createElement('h3');
                    venue.innerHTML = "venue : " + teamNames[teamId].venue;
                    teamDataDiv.appendChild(venue);
        var playersDiv = document.createElement('div');
        playersDiv.className = "players-div"
        players.players.forEach((player) => {
            var playerDiv = document.createElement('div');
            playerDiv.style.backgroundColor = teamNames[teamId].color;
            playerDiv.className = "player-card"
                if (isCaption(captainId,player.id)) {
                    var captain = document.createElement('h3');
                    captain.innerHTML = "captain : " + player.name;
                    teamDataDiv.appendChild(captain);
                    teamBannerDiv.appendChild(teamDataDiv);
                    teamBanner.appendChild(teamBannerDiv);
                }
                var playerImg = document.createElement('img');
                playerImg.src = player.image;
                playerDiv.appendChild(playerImg);
                var playerName = document.createElement('div');
                playerName.className = "player-name"
                    const name = player.name.split(" ");
                    var playerFirstName  = document.createElement('h2');
                    playerFirstName.innerHTML = name[0];
                    playerName.appendChild(playerFirstName);
                    var playerLastName = document.createElement('h3');
                    playerLastName.innerHTML = name[1];
                    playerName.appendChild(playerLastName);
                playerDiv.appendChild(playerName);
                var playerStats = document.createElement('div');
                playerStats.className = "player-stats";
                    playerStats.appendChild(populatePlayerStats(player.stats.matches,"Matches"));
                    playerStats.appendChild(populatePlayerStats(player.stats.runs,"Runs"));
                    playerStats.appendChild(populatePlayerStats(player.stats.wickets,"Wickets"));
                playerDiv.appendChild(playerStats);
            playersDiv.appendChild(playerDiv);
        });
        document.getElementById("team-detailed-view").appendChild(teamBanner);
        document.getElementById("team-detailed-view").appendChild(playersDiv);
        document.getElementById("loader-div").style.display = "none";
        document.getElementById("team-detailed-view").style.display = "flex";
    })
}