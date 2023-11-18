function displayFoodPicture(foodData){
    return `<div class="food-picture"><img src="${foodData.location}" alt="${foodData.title}"><h2>${foodData.title}</h2><p>Views: ${foodData.views}</p></div>`
}

module.exports = {displayFoodPicture}