const apiKey = "60f03daccdb94959999144811252512";

function getWeather() {
    const location = document.getElementById("locationInput").value;
    const resultDiv = document.getElementById("weatherResult");

    if (location === "") {
        resultDiv.innerHTML = "⚠️ Please enter a location";
        return;
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultDiv.innerHTML = "❌ Location not found";
                return;
            }

            const temp = data.current.temp_c;
            const condition = data.current.condition.text;
            const icon = data.current.condition.icon;

            resultDiv.innerHTML = `
                <h3>${data.location.name}, ${data.location.country}</h3>
                <img src="${icon}" alt="weather icon">
                <p>🌡 Temperature: <strong>${temp}°C</strong></p>
                <p>🌥 Condition: ${condition}</p>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = "⚠️ Error fetching data";
            console.error(error);
        });
}
