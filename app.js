window.addEventListener("load", ()=> {
    let long;
    let lat;
    let tempratureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector('.temperature span');


    if (navigator.geolocation) {        
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/b0f9b3319e9bd0dc77dc0250e0efaa2b/${lat},${long}`;

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                temperatureDegree.textContent = temperature;
                tempratureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                //Formula for Celcius
                let celsius = (temperature - 32) * (5 / 9);
                //set icon
                setIcons(icon, document.querySelector(".icon"));

                

                //Change from F/C
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C"; 
                        temperatureDegree.textContent = celsius.toFixed(2);
                    }else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });
            });
        });
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});