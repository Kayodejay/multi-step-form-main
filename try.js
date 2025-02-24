let stepActive = document.querySelectorAll(".steps .circle");
let inputBox = document.querySelectorAll(".info1 .input-box");
let progression = document.querySelectorAll(".step-info");
let sideBar = document.querySelectorAll(".steps .circle");
let nextBtn = document.querySelector(".next-btn");
let prevBtn = document.querySelector(".go-back-btn");
let confirmBtn = document.querySelector(".confirm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone_number");
let valid = true;
let currentStep = 0;

let showStep = (stepNb) => {
  progression[stepNb].style.display = "grid";
  sideBar[stepNb].classList.add("active");
  confirmBtn.style.display = "none";

  prevBtn.style.visibility = stepNb === 0 ? "hidden" : "visible";

  if (stepNb === progression.length - 1) {
    nextBtn.style.display = "none";
    confirmBtn.style.display = "block";
    console.log("does it work");
  } else {
    nextBtn.style.display = "block";
    console.log("it works");
  }
};

showStep(currentStep);

let validation = () => {
  valid = true;
  [nameInput, emailInput, phoneInput].forEach((input) => {
    let errorMsg = input.previousElementSibling.querySelector(".error-message");
    if (!input.value.trim()) {
      errorMsg.style.display = "block";
      valid = false;
    } else {
      errorMsg.style.display = "none";
    }
  });
  return valid;
};

let prevNext = (stepNb) => {
  if (currentStep === 0 && !validation()) return false;
  progression[currentStep].style.display = "none";
  sideBar[currentStep].classList.remove("active");
  currentStep += stepNb;
  showStep(currentStep);
};

nextBtn.addEventListener("click", () => prevNext(1));
prevBtn.addEventListener("click", () => prevNext(-1));

// -----STEP 1

document.querySelectorAll(".info1 input").forEach((input, i) => {
  input.addEventListener("blur", () => {
    let errorMsg = inputBox[i].querySelector(".error-message");
    if (input.value !== "") {
      errorMsg.style.display = "none";
    } else {
      errorMsg.style.display = "block";
    }
  });
});

// ----- STEP 2

let priceDetails = [0, 0, 0, 0];
let planSlider = document.querySelector(".plan-slider input");
document.querySelector(".year-plan").style.display = "none";
document.querySelector(".yearly").style.color = "hsl(233, 3.70%, 57.30%)";
let checkPlans = document.querySelectorAll('.plans input[type="checkbox"]');
let isMonthly = true;
let checkedPlanNb = 0;
let monthCheck = document.getElementsByName("checkmonth");
let yearCheck = document.getElementsByName("checkyear");

function yearlyChange() {
  document.querySelector(".month-plan").style.display = "none";
  document.querySelector(".year-plan").style.display = "grid";
  checkPlans[3].checked = true;
  checkedPlanNb = 3;
  priceDetails[0] = checkPrice(checkedPlanNb, null);
  monthCheck.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

function monthlyChange() {
  document.querySelector(".year-plan").style.display = "none";
  document.querySelector(".month-plan").style.display = "grid";
  checkPlans[0].checked = true;
  checkedPlanNb = 0;
  priceDetails[0] = checkPrice(checkedPlanNb, null);
  yearCheck.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

planSlider.addEventListener("change", (event) => {
  isMonthly = !event.target.checked;
  isMonthly ? monthlyChange() : yearlyChange();
  selectionName(checkedPlanNb);
  selectionOptions(checkedPlanNb);
  checkOptions();
  priceShow();
});

checkPlans.forEach((selection, i) => {
  selection.addEventListener("click", () => {
    checkedPlanNb = i;
    selectionName(checkedPlanNb);
    selectionOptions(checkedPlanNb);
    priceDetails[0] = checkPrice(checkedPlanNb, null);
    priceShow();
  });
});

// ----- STEP 3

let optionCase = [false, false, false];
let options = document.querySelectorAll(".add-on input");
document.querySelector(".add-on").style.display = "none";

let monthSelection = () => {
  document.querySelector(".online-price").innerHTML = "$1/mo";
  document.querySelector(".storage-price").innerHTML = "$2/mo";
  document.querySelector(".profile-price").innerHTML = "$2/mo";
};

let yearSelection = () => {
  document.querySelector(".online-price").innerHTML = "$10/mo";
  document.querySelector(".storage-price").innerHTML = "$20/mo";
  document.querySelector(".profile-price").innerHTML = "$20/mo";
};

options.forEach((option, i) => {
  option.addEventListener("change", (event) => {
    if (event.target.checked) {
      optionCase[i] = true;
      document
        .querySelector(".colored" + i)
        .forEach((el) => (el.style.display = "flex"));
      priceDetails[i + 1] = checkPrice(checkedPlanNb, i);
    } else {
      optionCase[i] = false;
      document
        .querySelector(".colored" + i)
        .forEach((el) => (el.style.display = "none"));
      priceDetails[i + 1] = 0;
      priceShow();
    }
    optionCase.includes(true)
      ? (document.querySelector(".add-on").style.display = "block")
      : (document.querySelector(".add-on").style.display = "none");
  });
});

// ----- STEP 4

function selectionName(option) {
  const plans = ["Arcade", "Advanced", "Pro"];
  const period = isMonthly ? "Monthly" : "Yearly";
  const prices = isMonthly ? [9, 12, 15] : [90, 120, 150];
  document.querySelector(".selection-name").innerHTML = `${
    plans[option % 3]
  } (${period})`;
  document.querySelector(".selection-price").innerHTML = `$${
    prices[option % 3]
  }/${isMonthly ? "mo" : "yr"}`;
}

function checkOptions() {
  options.forEach((check, i) => {
    if (check.checked) {
      priceDetails[i + 1] = checkPrice(checkedPlanNb, i);
    }
  });
}

function selectionOptions(option) {
  const prices = isMonthly
    ? ["$1/mo", "$2/mo", "$2/mo"]
    : ["$10/yr", "$20/yr", "$20/yr"];
  document.querySelectorAll(".option-price").forEach((el, i) => {
    el.innerHTML = prices[i];
  });
}

function checkPrice(plan, option) {
  const monthlyPrices = [9, 12, 15];
  const yearlyPrices = [90, 120, 150];
  const addOnMonthly = [1, 2, 2];
  const addOnYearly = [10, 20, 20];
  if (option === null)
    return isMonthly ? monthlyPrices[plan % 3] : yearlyPrices[plan % 3];
  return isMonthly ? addOnMonthly[option] : addOnYearly[option];
}

function priceShow() {
  let total = priceDetails.reduce((acc, val) => acc + val, 0);
  document.querySelector(".price").innerHTML = `&dollar;${total}/${
    isMonthly ? "mo" : "yr"
  }`;
}

// ----- CONFIRMATION

document.querySelector("#multistepForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#multistepForm").style.display = "none";
  document.querySelector(".confirmation").style.display = "grid";
});

priceDetails[0] = checkPrice(checkedPlanNb, null);
checkPlans[0].checked = true;
monthSelection();
selectionName(checkedPlanNb);
selectionOptions(checkedPlanNb);
priceShow();
