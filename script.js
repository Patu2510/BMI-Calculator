document.getElementById("healthForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to meters
    let weight = parseFloat(document.getElementById("weight").value);

    if (!name || !gender || isNaN(height) || isNaN(weight)) {
        alert("Please fill all fields correctly.");
        return;
    }

    let bmi = (weight / (height * height)).toFixed(2);
    let category = "";

    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.99) {
        category = "Healthy";
    } else if (bmi >= 25 && bmi < 29.99) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    document.getElementById("result").innerHTML = 
        `Hello, <strong>${name}</strong>! Your BMI is <strong>${bmi}</strong>. You are categorized as: <strong>${category}</strong>.`;
});