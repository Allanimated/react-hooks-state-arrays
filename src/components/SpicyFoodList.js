import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");
  
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });

  function handleFilter(cuisine) {
    setFilterBy(cuisine)
  }

  let allFoods = []
  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    setFoods((foods) => {
      allFoods = [...foods, newFood]
      return allFoods;
    })  
  }
  
  function handleAddHeatLevel(id) {
    const allFoods = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1
        }
      } else {
        return food;
      }
    })
    setFoods(allFoods)
  }
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => {handleAddHeatLevel(food.id)}}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  
  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
      <select name="filter" onChange={(e) => handleFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
    </div>
  );
}

export default SpicyFoodList;
