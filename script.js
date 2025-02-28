document.addEventListener("DOMContentLoaded", function () {
    const heightOption = document.getElementById("heightOption");
    const heightCmDiv = document.getElementById("heightCmDiv");
    const heightFeetDiv = document.getElementById("heightFeetDiv");
    const heightCmInput = document.getElementById("heightCm");
    const feetInput = document.getElementById("feet");
    const inchesInput = document.getElementById("inches");

    // Toggle height input fields based on selection
    heightOption.addEventListener("change", function () {
        if (this.value === "cm") {
            heightCmDiv.style.display = "block";
            heightFeetDiv.style.display = "none";
            heightCmInput.disabled = false;
            feetInput.disabled = true;
            inchesInput.disabled = true;
            feetInput.value = "";
            inchesInput.value = "";
        } else {
            heightCmDiv.style.display = "none";
            heightFeetDiv.style.display = "block";
            heightCmInput.disabled = true;
            feetInput.disabled = false;
            inchesInput.disabled = false;
            heightCmInput.value = "";
        }
    });

    document.getElementById("healthForm").addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let gender = document.getElementById("gender").value;
        let weight = parseFloat(document.getElementById("weight").value);
        let heightInCm = 0;

        if (heightOption.value === "cm") {
            heightInCm = parseFloat(heightCmInput.value);
        } else {
            let feet = parseFloat(feetInput.value) || 0;
            let inches = parseFloat(inchesInput.value) || 0;
            heightInCm = (feet * 30.48) + (inches * 2.54); // Convert feet/inches to cm
        }

        let heightInM = heightInCm / 100; // Convert cm to meters for BMI calculation

        if (!name || !gender || isNaN(heightInM) || isNaN(weight) || heightInM <= 0 || weight <= 0) {
            alert("Please fill all fields correctly.");
            return;
        }

        let bmi = (weight / (heightInM * heightInM)).toFixed(2);
        let category = "";
        let recommendation = "";
        let dietPlan = "";

        let minHealthyWeight = (18.5 * heightInM * heightInM).toFixed(1);
        let maxHealthyWeight = (24.9 * heightInM * heightInM).toFixed(1);

        if (bmi < 18.5) {
            category = "Underweight";
            let weightToGain = (minHealthyWeight - weight).toFixed(1);
            recommendation = `You should gain at least <strong>${weightToGain} kg</strong> to reach a healthy weight.`;

            dietPlan = `
                <h3>Weight Gain Plan 🥩🍞</h3>
                <ul>
                    <li>Eat calorie-dense foods like nuts, seeds, and whole grains.</li>
                    <li>Include lean meats, dairy, and healthy fats.</li>
                    <li>Consume frequent, high-calorie snacks.</li>
                    <li>Do strength training exercises.</li>
                </ul>
            `;
        } else if (bmi >= 18.5 && bmi < 24.99) {
            category = "Healthy";
            recommendation = `Great job, <strong>${name}</strong>! Maintain your healthy lifestyle.`;

            dietPlan = `
                <h3>Maintain Weight Plan 🥦🍎</h3>
                <ul>
                    <li>Eat a balanced diet with proteins, carbs, and fats.</li>
                    <li>Stay hydrated and avoid processed foods.</li>
                    <li>Engage in regular exercise.</li>
                </ul>
            `;
        } else if (bmi >= 25 && bmi < 29.99) {
            category = "Overweight";
            let weightToLose = (weight - maxHealthyWeight).toFixed(1);
            recommendation = `You should lose around <strong>${weightToLose} kg</strong> to reach a healthy weight.`;

            dietPlan = `
                <h3>Weight Loss Plan 🥗🏋️</h3>
                <ul>
                    <li>Focus on portion control and mindful eating.</li>
                    <li>Choose high-fiber foods like vegetables and legumes.</li>
                    <li>Exercise regularly (walking, yoga, or gym workouts).</li>
                </ul>
            `;
        } else {
            category = "Obese";
            let weightToLose = (weight - maxHealthyWeight).toFixed(1);
            recommendation = `You need to lose approximately <strong>${weightToLose} kg</strong> to reach a healthy range. Consider consulting a healthcare professional.`;

            dietPlan = `
                <h3>Weight Loss Plan 🥦🏃</h3>
                <ul>
                    <li>Follow a structured diet like keto, intermittent fasting, or a low-carb diet.</li>
                    <li>Avoid sugar and processed foods.</li>
                    <li>Increase physical activity.</li>
                </ul>
            `;
        }

        document.getElementById("result").innerHTML = 
            `<h2>Hello, <strong>${name}</strong>!</h2>
             <p>Your BMI is <strong>${bmi}</strong>, which means you are categorized as: <strong>${category}</strong>.</p>
             <p>${recommendation}</p>`;

        // Store and hide the diet plan initially
        document.getElementById("dietPlan").innerHTML = dietPlan;
        document.getElementById("dietPlan").style.display = "none";
        document.getElementById("showPlanBtn").style.display = "block"; // Show button after BMI calculation
    });

    // Show AI diet plan on button click
    document.getElementById("showPlanBtn").addEventListener("click", function() {
        document.getElementById("dietPlan").style.display = "block";
        this.style.display = "none"; // Hide button after plan is shown
    });
});