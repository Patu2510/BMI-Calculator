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

    let minHealthyWeight = (18.5 * height * height).toFixed(1);
    let maxHealthyWeight = (24.9 * height * height).toFixed(1);

    if (bmi < 18.5) {
        category = "Underweight";
        let weightToGain = (minHealthyWeight - weight).toFixed(1);
        recommendation = `You should gain at least <strong>${weightToGain} kg</strong> to reach a healthy weight.`;
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Healthy";
        recommendation = `Great job, <strong>${name}</strong>! Keep up your current routine and maintain a balanced lifestyle.`;
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
        let weightToLose = (weight - maxHealthyWeight).toFixed(1);
        recommendation = `You should lose around <strong>${weightToLose} kg</strong> to reach a healthy weight.`;
    } else {
        category = "Obese";
        let weightToLose = (weight - maxHealthyWeight).toFixed(1);
        recommendation = `You need to lose approximately <strong>${weightToLose} kg</strong> to be in the healthy range. Consider consulting a healthcare professional.`;
    }

    document.getElementById("result").innerHTML = 
        `Hello, <strong>${name}</strong>! Your BMI is <strong>${bmi}</strong>. You are categorized as: <strong>${category}</strong>.<br><br>${recommendation}`;
});