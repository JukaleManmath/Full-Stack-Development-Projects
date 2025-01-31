// http://api.weatherapi.com/v1/current.json?key=8c1faf79efde4984a92195840253101&q=Binghamton&aqi=no

const temperatureField = document.querySelector('.temp');
const locationField = document.querySelector('.time-loc p');
const dateField = document.querySelector('.time-loc span');
const weatherField = document.querySelector('.condition p');
const searchField = document.querySelector('.search-area');
const form = document.querySelector('form');

form.addEventListener("submit", searchForLocation)

const fetchResults = async (targetLocation) => {

    let url = `http://api.weatherapi.com/v1/current.json?key=8c1faf79efde4984a92195840253101&q=${targetLocation}&aqi=no`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_f;
    let condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
}

function updateDetails(temp, locName, time , condition){

    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];

    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = temp;
    locationField.innerText = locName;
    dateField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    weatherField.innerText = condition;
}

function searchForLocation(e){
    e.preventDefault();

    let target = searchField.value;
    fetchResults(target);
}

function getDayName(number){
    switch(number){
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
}