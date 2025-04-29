document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const healthForm = document.getElementById("healthForm");
    const cmOption = document.getElementById("cm-option");
    const ftOption = document.getElementById("ft-option");
    const heightCmDiv = document.getElementById("heightCmDiv");
    const heightFeetDiv = document.getElementById("heightFeetDiv");
    const heightCmInput = document.getElementById("heightCm");
    const feetInput = document.getElementById("feet");
    const inchesInput = document.getElementById("inches");
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const weightInput = document.getElementById("weight");
    const resultContainer = document.getElementById("resultContainer");
    const recalculateBtn = document.getElementById("recalculateBtn");
    const showPlanBtn = document.getElementById("showPlanBtn");
    const dietPlanDiv = document.getElementById("dietPlan");
    
    // Gender selection styling
    const genderOptions = document.querySelectorAll('.gender-option');
    genderOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Find the radio input inside this option and select it
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Update visual styling
            genderOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Height unit toggle
    cmOption.addEventListener("change", function() {
        if (this.checked) {
            heightCmDiv.classList.remove("d-none");
            heightFeetDiv.classList.add("d-none");
            heightCmInput.disabled = false;
            feetInput.disabled = true;
            inchesInput.disabled = true;
        }
    });

    ftOption.addEventListener("change", function() {
        if (this.checked) {
            heightCmDiv.classList.add("d-none");
            heightFeetDiv.classList.remove("d-none");
            heightCmInput.disabled = true;
            feetInput.disabled = false;
            inchesInput.disabled = false;
        }
    });

    // Form validation
    const validateName = () => {
        const name = nameInput.value.trim();
        if (name.length < 2) {
            nameInput.classList.add("is-invalid");
            document.getElementById("nameError").style.display = "block";
            return false;
        } else {
            nameInput.classList.remove("is-invalid");
            document.getElementById("nameError").style.display = "none";
            return true;
        }
    };

    const validateAge = () => {
        const age = parseInt(ageInput.value);
        if (isNaN(age) || age < 18 || age > 100) {
            ageInput.classList.add("is-invalid");
            document.getElementById("ageError").style.display = "block";
            return false;
        } else {
            ageInput.classList.remove("is-invalid");
            document.getElementById("ageError").style.display = "none";
            return true;
        }
    };

    const validateHeight = () => {
        if (cmOption.checked) {
            const heightCm = parseFloat(heightCmInput.value);
            if (isNaN(heightCm) || heightCm < 100 || heightCm > 250) {
                heightCmInput.classList.add("is-invalid");
                document.getElementById("heightCmError").style.display = "block";
                return false;
            } else {
                heightCmInput.classList.remove("is-invalid");
                document.getElementById("heightCmError").style.display = "none";
                return true;
            }
        } else {
            const feet = parseInt(feetInput.value);
            const inches = parseInt(inchesInput.value) || 0;
            
            if (isNaN(feet) || feet < 3 || feet > 8 || inches < 0 || inches > 11) {
                feetInput.classList.add("is-invalid");
                inchesInput.classList.add("is-invalid");
                document.getElementById("heightFtError").style.display = "block";
                return false;
            } else {
                feetInput.classList.remove("is-invalid");
                inchesInput.classList.remove("is-invalid");
                document.getElementById("heightFtError").style.display = "none";
                return true;
            }
        }
    };

    const validateWeight = () => {
        const weight = parseFloat(weightInput.value);
        if (isNaN(weight) || weight < 30 || weight > 300) {
            weightInput.classList.add("is-invalid");
            document.getElementById("weightError").style.display = "block";
            return false;
        } else {
            weightInput.classList.remove("is-invalid");
            document.getElementById("weightError").style.display = "none";
            return true;
        }
    };

    // Add input event listeners for real-time validation
    nameInput.addEventListener("input", validateName);
    ageInput.addEventListener("input", validateAge);
    heightCmInput.addEventListener("input", validateHeight);
    feetInput.addEventListener("input", validateHeight);
    inchesInput.addEventListener("input", validateHeight);
    weightInput.addEventListener("input", validateWeight);

    // Calculate BMI and display result
    healthForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isAgeValid = validateAge();
        const isHeightValid = validateHeight();
        const isWeightValid = validateWeight();
        
        if (!isNameValid || !isAgeValid || !isHeightValid || !isWeightValid) {
            return false; // Stop form submission if validation fails
        }

        // Get form values
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const weight = parseFloat(weightInput.value);
        
        let heightInCm = 0;
        if (cmOption.checked) {
            heightInCm = parseFloat(heightCmInput.value);
        } else {
            const feet = parseInt(feetInput.value) || 0;
            const inches = parseInt(inchesInput.value) || 0;
            heightInCm = (feet * 30.48) + (inches * 2.54); // Convert to cm
        }

        // Calculate BMI
        const heightInM = heightInCm / 100;
        const bmi = weight / (heightInM * heightInM);
        const roundedBmi = Math.round(bmi * 10) / 10; // Round to 1 decimal place
        
        // Calculate healthy weight range
        const minHealthyWeight = (18.5 * heightInM * heightInM).toFixed(1);
        const maxHealthyWeight = (24.9 * heightInM * heightInM).toFixed(1);
        
        // Determine BMI category and pointer position
        let category, bmiClass, pointerPosition;
        
        if (bmi < 18.5) {
            category = "Underweight";
            bmiClass = "text-primary";
            pointerPosition = (bmi / 40) * 100; // Position relative to max BMI of 40
        } else if (bmi >= 18.5 && bmi < 25) {
            category = "Normal Weight";
            bmiClass = "text-success";
            pointerPosition = (bmi / 40) * 100;
        } else if (bmi >= 25 && bmi < 30) {
            category = "Overweight";
            bmiClass = "text-warning";
            pointerPosition = (bmi / 40) * 100;
        } else {
            category = "Obese";
            bmiClass = "text-danger";
            pointerPosition = Math.min((bmi / 40) * 100, 95); // Cap at 95% to stay within scale
        }
        
        // Weight status message
        let statusMessage = "";
        if (bmi < 18.5) {
            const weightToGain = (minHealthyWeight - weight).toFixed(1);
            statusMessage = `You're <strong>${weightToGain} kg</strong> below your ideal weight range.`;
        } else if (bmi >= 18.5 && bmi < 25) {
            statusMessage = "Great job! You're at a healthy weight.";
        } else {
            const weightToLose = (weight - maxHealthyWeight).toFixed(1);
            statusMessage = `You're <strong>${weightToLose} kg</strong> above your ideal weight range.`;
        }
        
        // Update healthy weight range
        document.getElementById("healthyWeightRange").innerHTML = 
            `<strong>${minHealthyWeight} kg - ${maxHealthyWeight} kg</strong>`;
        
        // Update result content
        document.getElementById("result").innerHTML = `
            <h3 class="mb-3">Hello, ${name}!</h3>
            <div class="bmi-result mb-3">
                <h4>Your BMI: <span class="${bmiClass}">${roundedBmi}</span></h4>
                <p class="mb-2">Category: <strong class="${bmiClass}">${category}</strong></p>
                <p>${statusMessage}</p>
            </div>
        `;
        
        // Move the BMI pointer
        document.getElementById("bmiPointer").style.left = `${pointerPosition}%`;
        
        // Generate personalized diet plan
        generateDietPlan(bmi, gender, age);
        
        // Show result container
        document.querySelector(".progress-circle:nth-child(1)").classList.remove("active");
        document.querySelector(".progress-circle:nth-child(3)").classList.add("active");
        healthForm.closest('.col-md-6').classList.add('d-none');
        resultContainer.style.display = "block";
    });
    
    // Generate diet plan based on BMI
    function generateDietPlan(bmi, gender, age) {
        let planHtml = "";
        
        if (bmi < 18.5) {
            // Underweight plan
            planHtml = `
                <div class="plan-section">
                    <h5><i class="fas fa-bullseye text-primary me-2"></i>Goals</h5>
                    <p>Increase caloric intake and build lean muscle mass while maintaining a healthy diet.</p>
                </div>
                
                <div class="plan-section mt-3">
                    <h5><i class="fas fa-utensils text-primary me-2"></i>Nutrition Plan</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-check-circle text-success me-2"></i>Consume 300-500 calories above your daily needs</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Focus on protein-rich foods (lean meat, eggs, dairy)</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Include healthy fats (avocados, nuts, olive oil)</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Eat frequent meals (5-6 smaller meals per day)</li>
                    </ul>
                </div>
                
                <div class="plan-section mt-3">
                    <h5><i class="fas fa-dumbbell text-primary me-2"></i>Fitness Recommendations</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-check-circle text-success me-2"></i>Strength training 3-4 times per week</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Focus on compound exercises (squats, deadlifts)</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Limit cardio to 20-30 minutes per session</li>
                    </ul>
                </div>
            `;
        } else if (bmi >= 18.5 && bmi < 25) {
            // Normal weight plan
            planHtml = `
                <div class="plan-section">
                    <h5><i class="fas fa-bullseye text-success me-2"></i>Goals</h5>
                    <p>Maintain your current weight while improving fitness and overall health.</p>
                </div>
                
                <div class="plan-section mt-3">
                    <h5><i class="fas fa-utensils text-success me-2"></i>Nutrition Plan</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-check-circle text-success me-2"></i>Maintain balanced caloric intake</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Focus on whole foods and limit processed items</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Consume plenty of vegetables and fruits</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Stay hydrated (8-10 glasses of water daily)</li>
                    </ul>
                </div>
                
                <div class="plan-section mt-3">
                    <h5><i class="fas fa-dumbbell text-success me-2"></i>Fitness Recommendations</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-check-circle text-success me-2"></i>Mix of cardio and strength training</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Aim for 150+ minutes of exercise weekly</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Include flexibility exercises like yoga</li>
                    </ul>
                </div>
            `;
        } else if (bmi >= 25 && bmi < 30) {
            // Overweight plan
            planHtml = `
                <div class="plan-section">
                    <h5><i class="fas fa-bullseye text-warning me-2"></i>Goals</h5>
                    <p>Gradually reduce weight through sustainable diet and exercise changes.</p>
                </div>
                
                <div class="plan-section mt-3">
                    <h5><i class="fas fa-utensils text-warning me-2"></i>Nutrition Plan</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-check-circle text-success me-2"></i>Create a moderate calorie deficit (300-500 calories)</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Increase protein intake to preserve muscle</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Focus on fiber-rich foods to increase satiety</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Limit added sugars and refined carbohydrates</li>
                    </ul>
                </div>
                
                <div class="plan-section mt-3">
                    <h5><i class="fas fa-dumbbell text-warning me-2"></i>Fitness Recommendations</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-check-circle text-success me-2"></i>Cardio 3-5 times per week (30+ minutes)</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Include strength training 2-3 times weekly</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Consider HIIT for efficient fat burning</li>
                    </ul>
                </div>
            `;
        } else {
            // Obese plan
            planHtml = `
                <div class="plan-section">
                    <h5><i class="fas fa-bullseye text-danger me-2"></i>Goals</h5>
                    <p>Focus on health improvement through sustainable weight loss and lifestyle changes.</p>
                </div>
                
                <div class="plan-section mt-3">
                    <h5><i class="fas fa-utensils text-danger me-2"></i>Nutrition Plan</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-check-circle text-success me-2"></i>Create a moderate calorie deficit (500-750 calories)</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Prioritize whole foods and minimize processed items</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Control portion sizes and practice mindful eating</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Consider keeping a food journal for awareness</li>
                    </ul>
                </div>
                
                <div class="plan-section mt-3">
                    <h5><i class="fas fa-dumbbell text-danger me-2"></i>Fitness Recommendations</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-check-circle text-success me-2"></i>Start with low-impact activities (walking, swimming)</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Gradually increase activity duration and intensity</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Include strength training to preserve muscle mass</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i>Consider working with a fitness professional</li>
                    </ul>
                </div>
                
                <div class="plan-section mt-3 p-2 bg-danger bg-opacity-10 rounded">
                    <p class="mb-0"><i class="fas fa-exclamation-circle text-danger me-2"></i>Consult with a healthcare provider before starting any new exercise or diet program.</p>
                </div>
            `;
        }
        
        document.getElementById("planContent").innerHTML = planHtml;
    }
    
    // Button event listeners
    showPlanBtn.addEventListener("click", function() {
        dietPlanDiv.style.display = "block";
        this.style.display = "none";
    });
    
    recalculateBtn.addEventListener("click", function() {
        // Reset form
        healthForm.reset();
        
        // Reset validation states
        const formElements = [nameInput, ageInput, heightCmInput, feetInput, inchesInput, weightInput];
        formElements.forEach(el => el.classList.remove("is-invalid"));
        
        // Reset error messages
        const errorElements = document.querySelectorAll(".invalid-feedback");
        errorElements.forEach(el => el.style.display = "none");
        
        // Reset progress indicator
        document.querySelector(".progress-circle:nth-child(3)").classList.remove("active");
        document.querySelector(".progress-circle:nth-child(1)").classList.add("active");
        
        // Hide result and show form
        resultContainer.style.display = "none";
        healthForm.closest('.col-md-6').classList.remove('d-none');
        
        // Reset diet plan
        dietPlanDiv.style.display = "none";
        showPlanBtn.style.display = "block";
    });
    
    // Initialize gender options styling
    document.querySelector('.gender-option').classList.add('selected');
});
