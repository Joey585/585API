const fetch = require("node-fetch");

const getDoxInfo = (id) => new Promise(async (resolve, reject) => {
    const locationRaw = await fetch("https://api.3geonames.org/?randomland=yes&json=1");
    const locationData = await locationRaw.json();


    let creditCardNumber;
    const ip = getRandomInt(1, 255) + "." + getRandomInt(1, 255) + "." + getRandomInt(1, 255) + "." + getRandomInt(1, 255);
    const token = await getToken(id)

    switch (getRandomInt(3, 6)){
        case 3:
            creditCardNumber = "3" + (Math.round(Math.random() * 999) + 111) + " " + (Math.round(Math.random() * 9999) + 1111) + " " + (Math.round(Math.random() * 9999) + 1111) + " " + (Math.round(Math.random() * 9999) + 1111);
            break;
        case 4:
            creditCardNumber = "4" + (Math.round(Math.random() * 999) + 111) + " " + (Math.round(Math.random() * 9999) + 1111) + " " + (Math.round(Math.random() * 9999) + 1111) + " " + (Math.round(Math.random() * 9999) + 1111);
            break;
        case 5:
            creditCardNumber = "5" + (Math.round(Math.random() * 999) + 111) + " " + (Math.round(Math.random() * 9999) + 1111) + " " + (Math.round(Math.random() * 9999) + 1111) + " " + (Math.round(Math.random() * 9999) + 1111);
            break;
        case 6:
            creditCardNumber = "6" + (Math.round(Math.random() * 999) + 111) + " " + (Math.round(Math.random() * 9999) + 1111) + " " + (Math.round(Math.random() * 9999) + 1111) + " " + (Math.round(Math.random() * 9999) + 1111);
            break;
        default:
            console.log("Broke");
            break;
    }

    const data = `**Coordinates:** ${locationData.nearest.inlatt}, ${locationData.nearest.inlongt}\n**Credit Card Number:** ${creditCardNumber}\n**IP Address:** ${ip}\n**City, Country:** ${locationData.nearest.city}, ${locationData.nearest.state}\n**Token:** ${token}`

    resolve(data)
});

const getToken = (id) => new Promise(async (resolve, reject) => {
    const data = await fetch("https://discord.com/api/v9/auth/handoff", {
        method: "POST",
        headers: {
            "Authorization": "OTcxOTkxOTE4NjAwOTI5MzUw.GqCdRY.mdxHzdFdi1YSDTRhEm4hLzGLCXvIKnQ6B44nSo",
            "Content-Type": "application/json"
        },
        body: `{ "key": "balls" }`
    }).then((data) => {
        return data.json()
    });

    let token = data.handoff_token.match(/\.(.*)/g)[0]

    resolve(Buffer.from(id).toString("base64") + token)
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { getDoxInfo }
