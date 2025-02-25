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
    let recommendation = "";
    let dietPlan = "";

    let minHealthyWeight = (18.5 * height * height).toFixed(1);
    let maxHealthyWeight = (24.9 * height * height).toFixed(1);

    if (bmi < 18.5) {
        category = "Underweight";
        let weightToGain = (minHealthyWeight - weight).toFixed(1);
        recommendation = `You should gain at least <strong>${weightToGain} kg</strong> to reach a healthy weight.`;

        dietPlan = `
            <h3>Weight Gain Plan 🥩🍞</h3>
            <ul>
                <li>Eat nutrient-dense foods like nuts, seeds, whole grains, and dairy.</li>
                <li>Include lean meats, fish, eggs, beans, and pulses.</li>
                <li>Add healthy fats like avocados, olive oil, and nut butters.</li>
                <li>Eat small meals frequently and include high-calorie snacks.</li>
                <li>Consider strength training exercises to build muscle.</li>
            </ul>
        `;
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Healthy";
        recommendation = `Great job, <strong>${name}</strong>! Maintain your healthy lifestyle.`;

        dietPlan = `
            <h3>Maintain Weight Plan 🥦🍎</h3>
            <ul>
                <li>Eat a balanced diet with fruits, vegetables, whole grains, and lean proteins.</li>
                <li>Limit high-calorie, sugary, and processed foods.</li>
                <li>Drink plenty of water and stay hydrated.</li>
                <li>Practice portion control and mindful eating.</li>
                <li>Engage in regular physical activity like walking or yoga.</li>
            </ul>
        `;
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
        let weightToLose = (weight - maxHealthyWeight).toFixed(1);
        recommendation = `You should lose around <strong>${weightToLose} kg</strong> to reach a healthy weight.`;

        dietPlan = `
            <h3>Weight Loss Plan 🥗🏋️</h3>
            <ul>
                <li>Try a low-carb or low-calorie diet based on your preference.</li>
                <li>Eat more fiber-rich foods like vegetables, whole grains, and legumes.</li>
                <li>Choose healthy fats like olive oil and avocados.</li>
                <li>Drink plenty of water and avoid sugary drinks.</li>
                <li>Consider intermittent fasting or a high-protein diet.</li>
                <li>Include regular physical activity like walking, yoga, or gym workouts.</li>
            </ul>
        `;
    } else {
        category = "Obese";
        let weightToLose = (weight - maxHealthyWeight).toFixed(1);
        recommendation = `You need to lose approximately <strong>${weightToLose} kg</strong> to be in the healthy range. Consider consulting a healthcare professional.`;

        dietPlan = `
            <h3>Weight Loss Plan 🥦🏃</h3>
            <ul>
                <li>Follow a structured diet plan like keto, intermittent fasting, or the Mayo Clinic Diet.</li>
                <li>Eat whole, unprocessed foods and limit sugar intake.</li>
                <li>Stay active with daily physical exercise.</li>
                <li>Monitor your calorie intake and make healthy food choices.</li>
                <li>Consult a nutritionist for a personalized meal plan.</li>
            </ul>
        `;
    }

    document.getElementById("result").innerHTML = 
        `<h2>Hello, <strong>${name}</strong>!</h2>
         <p>Your BMI is <strong>${bmi}</strong>, which means you are categorized as: <strong>${category}</strong>.</p>
         <p>${recommendation}</p>`;

    // Store the diet plan but don't show it yet
    document.getElementById("dietPlan").innerHTML = dietPlan;
    document.getElementById("dietPlan").style.display = "none"; // Ensure hidden at first
    document.getElementById("showPlanBtn").style.display = "block"; // Show button after BMI calculation
});

// Show diet plan on button click
document.getElementById("showPlanBtn").addEventListener("click", function() {
    document.getElementById("dietPlan").style.display = "block"; // Show diet plan
    this.style.display = "none"; // Hide button after plan is shown
});