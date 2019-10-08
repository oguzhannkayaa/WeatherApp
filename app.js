window.addEventListener("load", () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");


    const news = document.querySelector('ul');

    let newsUrl = "https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=PO8ldywdaxGLcZaDFByVHrXognwllorv";

    const myList = document.querySelector('ul');
    const myRequest = new Request('products.json');

    fetch(newsUrl)
        .then(response => response.json())
        .then(data => {
            for (const product of data.results) {
                let listItem = document.createElement('li');
                listItem.appendChild(
                    document.createElement('strong')
                ).textContent = product.Name;
                listItem.append(
                    ` ${
                        product.title
                    }.  `
                );
                listItem.appendChild(
                    document.createElement('strong')
                )
                myList.appendChild(listItem);
            }
        });












































    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/45462dcffb2babeefaa728e5b041dd64/${lat},${long}`;

            fetch(api).then((res) => {
                return res.json()
            })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    let {timezone} = data;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = timezone;
                    setIcons(icon, document.querySelector(".icon"));

                    //Set DOM Elements from the API
                    return new Promise((resolve, reject) => {
                        let degreeConverted = ((temperature - 32) * (5/9)).toString().substring(0, 2);
                        resolve(degreeConverted)
                    }).then((res) => {
                        temperatureDegree.textContent = res;
                    }).catch((err)=> {
                        console.log(err)
                    });
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        console.log(currentIcon);
        skycons.play();
        return skycons.set(iconID, currentIcon);
    }
});