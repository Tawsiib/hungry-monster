
const mealContainer = document.querySelector('.meals');
const searchBtn = document.querySelector('.search-btn');
const errorMessage = document.querySelector('.error-message');

// Search Btn Click Function
searchBtn.addEventListener('click', function () {
    const mealSearch = document.querySelector('.meal-input').value;
    mealContainer.innerHTML = '';
    if (mealSearch === '') {
        errorMessage.style.display = 'block';
    } else {
        getFood(mealSearch);
        errorMessage.style.display = 'none';
    }
});
// Display Meals 
const displayMeals = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderFoodInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
};
// Render Single Food Info
const renderFoodInfo = (food) => {
    // Get all ingredients from the object. Up to 20
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (food[`strIngredient${i}`]) {
            ingredients.push(`${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`);
        } else {
            // Stop if there are no more ingredients
            break;
        }
    }
    const foodDetailsDiv = document.getElementById('foodsDetails');
    foodDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    
    <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>
    <ul class="list-unstyled mb-0">
    ${ingredients.map((ingredient) => `<li><i class="icon-check icons"></i>${ingredient}</li>`).join('')}
    </ul>
`;
};
// Foods Loop
function getFood(mealId) {
    const mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(mainApi)
        .then(res => res.json())
        .then(data => {
            displayFoods(data.meals);
        });

    const displayFoods = foods => {
        const foodsDiv = document.querySelector('.meals');
        if (foods != null) {
            foods.map(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-md-3';
                const foodInfo = `
                        <div onclick="displayMeals('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                    `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } else {
            errorMessage.style.display = 'block';
        }
    };
}