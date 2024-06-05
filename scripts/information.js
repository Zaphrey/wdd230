const visits = document.querySelector("#visits");

let totalVisits = window.localStorage.getItem("visits-ls") || 0;

if (totalVisits !== 0) {
    visits.textContent = totalVisits;
}
else {
    visits.textContent = "Looks like this is your first visit! Welcome!";
}

totalVisits++;

window.localStorage.setItem("visits-ls", totalVisits);