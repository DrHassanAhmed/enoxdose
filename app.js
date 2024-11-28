// Function to calculate creatinine clearance using Cockcroft-Gault formula with serum creatinine in micromol/L
function calculateCreatinineClearance(age, weight, serumCreatinine, gender) {
    const serumCreatinineMgDl = serumCreatinine / 88.4; // Convert micromol/L to mg/dL
    const genderFactor = gender === "female" ? 0.85 : 1; // Adjustment for females
    return ((140 - age) * weight * genderFactor) / (72 * serumCreatinineMgDl); // CrCl in mL/min
}

// Function to determine enoxaparin dose based on creatinine clearance, weight, and indication
function determineEnoxaparinDose(creatinineClearance, weight, indication) {
    let finalDose = "";

    if (indication === "prophylaxis") {
        if (creatinineClearance >= 30) {
            if (weight < 50) {
                finalDose = "20 mg OD";
            } else if (weight >= 50 && weight <= 100) {
                finalDose = "40 mg OD";
            } else if (weight > 100 && weight <= 150) {
                finalDose = "40 mg BD";
            } else if (weight > 150) {
                finalDose = "60 mg BD";
            }
        } else if (creatinineClearance >= 15 && creatinineClearance < 30) {
            if (weight < 50) {
                finalDose = "20 mg OD";
            } else if (weight >= 50 && weight <= 100) {
                finalDose = "20 mg OD";
            } else if (weight > 100 && weight <= 150) {
                finalDose = "40 mg OD";
            } else if (weight > 150) {
                finalDose = "60 mg OD";
            }
        } else {
            finalDose = "Dose as advised by specialist";
        }
    } else if (indication === "treatment") {
        if (creatinineClearance >= 30) {
            if (weight < 50) {
                finalDose = `${(1.5 * weight).toFixed(1)} mg OD`;
            } else if (weight >= 50 && weight <= 100) {
                finalDose = `${(1.5 * weight).toFixed(1)} mg OD`;
            } else if (weight > 100 && weight <= 150) {
                finalDose = `${(1 * weight).toFixed(1)} mg BD`;
            } else if (weight > 150) {
                finalDose = "150 mg BD";
            }
        } else if (creatinineClearance >= 15 && creatinineClearance < 30) {
            if (weight < 50) {
                finalDose = `${(1 * weight).toFixed(1)} mg OD`;
            } else if (weight >= 50 && weight <= 100) {
                finalDose = `${(1 * weight).toFixed(1)} mg OD`;
            } else if (weight > 100 && weight <= 150) {
                finalDose = `${(1 * weight).toFixed(1)} mg OD`;
            } else if (weight > 150) {
                finalDose = `${(1 * weight).toFixed(1)} mg OD`;
            }
        } else {
            finalDose = "Dose as advised by specialist";
        }
    }

    return finalDose;
}

// Main calculate function
function calculate() {
    // Input values
    const age = parseFloat(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const serumCreatinine = parseFloat(document.getElementById("serumCreatinine").value);
    const gender = document.getElementById("gender").value;
    const indication = document.getElementById("indication").value;

    // Validating input
    if (isNaN(age) || isNaN(weight) || isNaN(serumCreatinine)) {
        document.getElementById("creatinineClearanceResult").textContent = "Please provide valid input for all fields.";
        document.getElementById("creatinineClearanceResult").classList.add("error");
        return;
    }

    // Calculate creatinine clearance
    const creatinineClearance = calculateCreatinineClearance(age, weight, serumCreatinine, gender);

    // Determine enoxaparin dose
    const enoxaparinDose = determineEnoxaparinDose(creatinineClearance, weight, indication);

    // Display results
    document.getElementById("creatinineClearanceResult").textContent = `Creatinine Clearance: ${creatinineClearance.toFixed(2)} mL/min`;
    document.getElementById("enoxaparinDoseResult").textContent = `Enoxaparin Dose: ${enoxaparinDose}`;
}
