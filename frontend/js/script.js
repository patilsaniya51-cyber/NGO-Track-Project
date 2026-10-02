// =========================================
// NGO TRACK - COMPLETE SCRIPT
// =========================================

// =========================================
// LOGIN
// =========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    const message = document.getElementById("message");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (
            email === "admin@ngotrack.com" &&
            password === "12345"
        ) {
            message.textContent = "Login successful!";
            message.style.color = "#315b4d";

            window.location.href = "dashboard.html";
        } else {
            message.textContent = "Invalid email or password.";
            message.style.color = "#c87551";
        }
    });
}


// =========================================
// DONATION TYPE
// =========================================

const donationType = document.getElementById("type");
const amountGroup = document.getElementById("amountGroup");
const amountInput = document.getElementById("amount");
const quantityInput = document.getElementById("quantity");
const unitInput = document.getElementById("unit");

const quantityGroup = quantityInput?.parentElement;
const unitGroup = unitInput?.parentElement;

if (donationType) {
    donationType.addEventListener("change", function () {

        const selectedType = donationType.value;

        const moneyTypes = [
            "cash",
            "bank",
            "online",
            "cheque"
        ];

        const materialTypes = [
            "clothes",
            "food",
            "books",
            "medicines",
            "furniture",
            "toys",
            "other"
        ];

        if (moneyTypes.includes(selectedType)) {

            if (amountGroup) {
                amountGroup.style.display = "flex";
            }

            if (amountInput) {
                amountInput.required = true;
            }

            if (quantityGroup) {
                quantityGroup.style.display = "none";
            }

            if (unitGroup) {
                unitGroup.style.display = "none";
            }

        } else if (materialTypes.includes(selectedType)) {

            if (amountGroup) {
                amountGroup.style.display = "none";
            }

            if (amountInput) {
                amountInput.required = false;
                amountInput.value = "";
            }

            if (quantityGroup) {
                quantityGroup.style.display = "flex";
            }

            if (unitGroup) {
                unitGroup.style.display = "flex";
            }
        }
    });
}


// =========================================
// DONATIONS
// =========================================

const donationForm = document.getElementById("donationForm");
const donationList = document.getElementById("donationList");

let editingDonationIndex = null;

if (donationForm) {

    donationForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const donorName =
            document.getElementById("donorName").value.trim();

        const type =
            document.getElementById("type").value;

        const amount =
            document.getElementById("amount").value;

        const quantity =
            document.getElementById("quantity").value;

        const unit =
            document.getElementById("unit").value;

        const date =
            document.getElementById("date").value;

        const purpose =
            document.getElementById("purpose").value.trim();

        const donationData = {
            donorName: donorName,
            type: type,
            amount: Number(amount) || 0,
            quantity: Number(quantity) || 0,
            unit: unit,
            date: date,
            purpose: purpose
        };

        try {

            const response = await fetch(
                "https://ngo-track-project.onrender.com/api/donations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(donationData)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to save donation");
            }

            const savedDonation = await response.json();

            console.log(
                "Donation saved to MongoDB:",
                savedDonation
            );

            const donations =
                JSON.parse(
                    localStorage.getItem("donations")
                ) || [];

            if (editingDonationIndex !== null) {

                donations[editingDonationIndex] = donationData;

                editingDonationIndex = null;

            } else {

                donations.push(donationData);
            }

            localStorage.setItem(
                "donations",
                JSON.stringify(donations)
            );

            alert("Donation saved successfully!");

            donationForm.reset();

            location.reload();

        } catch (error) {

            console.error(
                "Error saving donation:",
                error
            );

            alert(
                "Failed to save donation. Make sure the backend is running."
            );
        }
    });
}


// =========================================
// BENEFICIARIES
// =========================================

const addBeneficiaryBtn =
    document.getElementById("addBeneficiaryBtn");

const beneficiaryList =
    document.getElementById("beneficiaryList");

let editingBeneficiaryIndex = null;

if (addBeneficiaryBtn) {

    addBeneficiaryBtn.addEventListener(
        "click",
        function () {

            const name =
                document
                    .getElementById("beneficiaryName")
                    .value
                    .trim();

            const age =
                document
                    .getElementById("beneficiaryAge")
                    .value;

            const locationValue =
                document
                    .getElementById("beneficiaryLocation")
                    .value
                    .trim();

            const category =
                document
                    .getElementById("supportCategory")
                    .value;

            const contact =
                document
                    .getElementById("beneficiaryContact")
                    .value
                    .trim();

            const date =
                document
                    .getElementById("supportDate")
                    .value;

            if (
                !name ||
                !age ||
                !locationValue ||
                !date ||
                category === "Select support"
            ) {
                alert(
                    "Please fill in all required beneficiary details."
                );
                return;
            }

            const beneficiaryData = {
                name: name,
                age: Number(age),
                location: locationValue,
                category: category,
                contact: contact,
                date: date
            };

            fetch(
                "https://ngo-track-project.onrender.com/api/beneficiaries",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        beneficiaryData
                    )
                }
            )
                .then(function (response) {

                    if (!response.ok) {
                        throw new Error(
                            "Failed to save beneficiary"
                        );
                    }

                    return response.json();
                })
                .then(function (data) {

                    console.log(
                        "Beneficiary saved to MongoDB:",
                        data
                    );

                    const beneficiaries =
                        JSON.parse(
                            localStorage.getItem(
                                "beneficiaries"
                            )
                        ) || [];

                    if (
                        editingBeneficiaryIndex !== null
                    ) {

                        beneficiaries[
                            editingBeneficiaryIndex
                        ] = beneficiaryData;

                        editingBeneficiaryIndex = null;

                    } else {

                        beneficiaries.push(
                            beneficiaryData
                        );
                    }

                    localStorage.setItem(
                        "beneficiaries",
                        JSON.stringify(
                            beneficiaries
                        )
                    );

                    alert(
                        "Beneficiary saved successfully!"
                    );

                    location.reload();
                })
                .catch(function (error) {

                    console.error(
                        "Error saving beneficiary:",
                        error
                    );

                    alert(
                        "Failed to save beneficiary."
                    );
                });
        }
    );
}


// =========================================
// UTILIZATION
// =========================================

const recordUtilizationBtn =
    document.getElementById(
        "recordUtilizationBtn"
    );

let editingUtilizationIndex = null;

if (recordUtilizationBtn) {

    recordUtilizationBtn.addEventListener(
        "click",
        function () {

            const amount =
                document
                    .getElementById(
                        "utilizationAmount"
                    )
                    .value;

            const category =
                document
                    .getElementById(
                        "utilizationCategory"
                    )
                    .value;

            const date =
                document
                    .getElementById(
                        "utilizationDate"
                    )
                    .value;

            const description =
                document
                    .getElementById(
                        "utilizationDescription"
                    )
                    .value
                    .trim();

            if (
                !amount ||
                !date ||
                !description ||
                category === "Select category"
            ) {
                alert(
                    "Please fill in all utilization details."
                );
                return;
            }

            const utilizationData = {
                amount: Number(amount),
                category: category,
                date: date,
                description: description
            };

            fetch(
                "https://ngo-track-project.onrender.com/api/utilizations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        utilizationData
                    )
                }
            )
                .then(function (response) {

                    if (!response.ok) {
                        throw new Error(
                            "Failed to save utilization"
                        );
                    }

                    return response.json();
                })
                .then(function (data) {

                    console.log(
                        "Utilization saved to MongoDB:",
                        data
                    );

                    const utilizations =
                        JSON.parse(
                            localStorage.getItem(
                                "utilizations"
                            )
                        ) || [];

                    if (
                        editingUtilizationIndex !== null
                    ) {

                        utilizations[
                            editingUtilizationIndex
                        ] = utilizationData;

                        editingUtilizationIndex = null;

                    } else {

                        utilizations.push(
                            utilizationData
                        );
                    }

                    localStorage.setItem(
                        "utilizations",
                        JSON.stringify(
                            utilizations
                        )
                    );

                    alert(
                        "Fund utilization recorded successfully!"
                    );

                    location.reload();
                })
                .catch(function (error) {

                    console.error(
                        "Error saving utilization:",
                        error
                    );

                    alert(
                        "Failed to save utilization."
                    );
                });
        }
    );
}


// =========================================
// DASHBOARD TOTALS
// =========================================

const totalDonationsCard =
    document.getElementById("totalDonations");

const amountUtilizedCard =
    document.getElementById("amountUtilized");

const remainingAmountCard =
    document.getElementById("remainingAmount");

const beneficiariesCard =
    document.getElementById("beneficiaryCount");

if (
    totalDonationsCard &&
    amountUtilizedCard &&
    remainingAmountCard &&
    beneficiariesCard
) {

    const donations =
        JSON.parse(
            localStorage.getItem("donations")
        ) || [];

    const utilizations =
        JSON.parse(
            localStorage.getItem("utilizations")
        ) || [];

    const beneficiaries =
        JSON.parse(
            localStorage.getItem("beneficiaries")
        ) || [];

    let totalDonations = 0;

    donations.forEach(function (donation) {

        totalDonations +=
            Number(donation.amount) || 0;
    });

    let amountUtilized = 0;

    utilizations.forEach(function (utilization) {

        amountUtilized +=
            Number(utilization.amount) || 0;
    });

    let remainingAmount =
        totalDonations - amountUtilized;

    if (remainingAmount < 0) {
        remainingAmount = 0;
    }

    totalDonationsCard.textContent =
        "₹" +
        totalDonations.toLocaleString("en-IN");

    amountUtilizedCard.textContent =
        "₹" +
        amountUtilized.toLocaleString("en-IN");

    remainingAmountCard.textContent =
        "₹" +
        remainingAmount.toLocaleString("en-IN");

    beneficiariesCard.textContent =
        beneficiaries.length;
}


// =========================================
// DASHBOARD RECENT DONATIONS
// =========================================

const dashboardDonationList =
    document.getElementById(
        "dashboardDonationList"
    );

if (dashboardDonationList) {

    const donations =
        JSON.parse(
            localStorage.getItem("donations")
        ) || [];

    const recentDonations =
        donations
            .slice(-5)
            .reverse();

    dashboardDonationList.innerHTML = "";

    if (recentDonations.length === 0) {

        dashboardDonationList.innerHTML = `
            <p style="
                color:#99918a;
                font-size:12px;
                padding:15px 0;
            ">
                No donations added yet.
            </p>
        `;

    } else {

        recentDonations.forEach(
            function (donation) {

                const row =
                    document.createElement(
                        "div"
                    );

                row.className =
                    "donation-row";

                const donorInitial =
                    donation.donorName
                        ? donation.donorName
                            .charAt(0)
                            .toUpperCase()
                        : "D";

                const donationAmount =
                    donation.amount
                        ? "₹" +
                          Number(
                              donation.amount
                          ).toLocaleString(
                              "en-IN"
                          )
                        : donation.quantity +
                          " " +
                          donation.unit;

                row.innerHTML = `
                    <div class="donor-icon">
                        ${donorInitial}
                    </div>

                    <div class="donor-info">
                        <strong>
                            ${donation.donorName}
                        </strong>

                        <span>
                            ${donation.date}
                        </span>
                    </div>

                    <strong class="amount">
                        + ${donationAmount}
                    </strong>
                `;

                dashboardDonationList.appendChild(
                    row
                );
            }
        );
    }
}


// =========================================
// UTILIZATION PROGRESS
// =========================================

const utilizationPercentage =
    document.getElementById(
        "utilizationPercentage"
    );

const amountUtilizedPercentage =
    document.getElementById(
        "amountUtilizedPercentage"
    );

const dashboardUtilized =
    document.getElementById(
        "dashboardUtilized"
    );

const dashboardRemaining =
    document.getElementById(
        "dashboardRemaining"
    );

const utilizationProgress =
    document.getElementById(
        "utilizationProgress"
    );

if (
    utilizationPercentage &&
    dashboardUtilized &&
    dashboardRemaining &&
    utilizationProgress
) {

    const donations =
        JSON.parse(
            localStorage.getItem("donations")
        ) || [];

    const utilizations =
        JSON.parse(
            localStorage.getItem("utilizations")
        ) || [];

    let totalDonations = 0;

    donations.forEach(function (donation) {

        totalDonations +=
            Number(donation.amount) || 0;
    });

    let totalUtilized = 0;

    utilizations.forEach(
        function (utilization) {

            totalUtilized +=
                Number(utilization.amount) || 0;
        }
    );

    let remaining =
        totalDonations - totalUtilized;

    if (remaining < 0) {
        remaining = 0;
    }

    let percentage = 0;

    if (totalDonations > 0) {

        percentage =
            (totalUtilized /
                totalDonations) *
            100;
    }

    if (percentage > 100) {
        percentage = 100;
    }

    utilizationPercentage.textContent =
        percentage.toFixed(1) + "%";

    if (amountUtilizedPercentage) {

        amountUtilizedPercentage.textContent =
            percentage.toFixed(1) +
            "% utilized";
    }

    dashboardUtilized.textContent =
        "₹" +
        totalUtilized.toLocaleString(
            "en-IN"
        );

    dashboardRemaining.textContent =
        "₹" +
        remaining.toLocaleString(
            "en-IN"
        );

    utilizationProgress.style.width =
        percentage + "%";
}


// =========================================
// BENEFICIARY LIST
// =========================================

if (beneficiaryList) {

    const beneficiaries =
        JSON.parse(
            localStorage.getItem(
                "beneficiaries"
            )
        ) || [];

    beneficiaryList.innerHTML = "";

    if (beneficiaries.length === 0) {

        beneficiaryList.innerHTML = `
            <p style="
                color:#99918a;
                font-size:12px;
            ">
                No beneficiaries added yet.
            </p>
        `;

    } else {

        beneficiaries.forEach(
            function (
                beneficiary,
                index
            ) {

                const item =
                    document.createElement(
                        "div"
                    );

                item.style.cssText = `
                    padding:15px;
                    margin-bottom:10px;
                    border-radius:12px;
                    background:#fff8f2;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:15px;
                `;

                item.innerHTML = `
                    <div>
                        <strong>
                            ${beneficiary.name}
                        </strong>

                        <p style="
                            margin:5px 0 0;
                            color:#777;
                        ">
                            Age: ${beneficiary.age}
                            |
                            Location:
                            ${beneficiary.location}
                            |
                            Support:
                            ${beneficiary.category}
                        </p>
                    </div>

                    <div style="
                        display:flex;
                        gap:8px;
                    ">
                        <button
                            onclick="editBeneficiary(${index})"
                            style="
                                border:none;
                                background:#ef8354;
                                color:white;
                                padding:8px 14px;
                                border-radius:8px;
                                cursor:pointer;
                            "
                        >
                            ✏️ Edit
                        </button>

                        <button
                            onclick="deleteBeneficiary(${index})"
                            style="
                                border:none;
                                background:#d94f70;
                                color:white;
                                padding:8px 14px;
                                border-radius:8px;
                                cursor:pointer;
                            "
                        >
                            🗑️ Delete
                        </button>
                    </div>
                `;

                beneficiaryList.appendChild(
                    item
                );
            }
        );
    }
}


// =========================================
// EDIT BENEFICIARY
// =========================================

function editBeneficiary(index) {

    const beneficiaries =
        JSON.parse(
            localStorage.getItem(
                "beneficiaries"
            )
        ) || [];

    const beneficiary =
        beneficiaries[index];

    if (!beneficiary) {
        return;
    }

    document.getElementById(
        "beneficiaryName"
    ).value =
        beneficiary.name || "";

    document.getElementById(
        "beneficiaryAge"
    ).value =
        beneficiary.age || "";

    document.getElementById(
        "beneficiaryLocation"
    ).value =
        beneficiary.location || "";

    document.getElementById(
        "supportCategory"
    ).value =
        beneficiary.category || "";

    document.getElementById(
        "beneficiaryContact"
    ).value =
        beneficiary.contact || "";

    document.getElementById(
        "supportDate"
    ).value =
        beneficiary.date || "";

    editingBeneficiaryIndex =
        index;

    document.getElementById(
        "beneficiaryName"
    ).focus();

    alert(
        "Beneficiary details loaded. Edit the information and click Add Beneficiary to save."
    );
}


// =========================================
// DELETE BENEFICIARY
// =========================================

function deleteBeneficiary(index) {

    const beneficiaries =
        JSON.parse(
            localStorage.getItem(
                "beneficiaries"
            )
        ) || [];

    if (
        confirm(
            "Are you sure you want to delete this beneficiary?"
        )
    ) {

        beneficiaries.splice(index, 1);

        localStorage.setItem(
            "beneficiaries",
            JSON.stringify(
                beneficiaries
            )
        );

        location.reload();
    }
}


// =========================================
// UTILIZATION LIST
// =========================================

const utilizationList =
    document.getElementById(
        "utilizationList"
    );

if (utilizationList) {

    const utilizations =
        JSON.parse(
            localStorage.getItem(
                "utilizations"
            )
        ) || [];

    utilizationList.innerHTML = "";

    if (utilizations.length === 0) {

        utilizationList.innerHTML = `
            <p style="
                color:#99918a;
                font-size:12px;
            ">
                No utilization records yet.
            </p>
        `;

    } else {

        utilizations
            .slice()
            .reverse()
            .forEach(
                function (
                    utilization,
                    reversedIndex
                ) {

                    const actualIndex =
                        utilizations.length -
                        1 -
                        reversedIndex;

                    const row =
                        document.createElement(
                            "div"
                        );

                    row.style.padding =
                        "15px 0";

                    row.style.borderBottom =
                        "1px solid #f1ece7";

                    row.innerHTML = `
                        <div>
                            <strong style="
                                display:block;
                                color:#46514d;
                                font-size:13px;
                                margin-bottom:5px;
                            ">
                                ₹${Number(
                                    utilization.amount
                                ).toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                            <span style="
                                color:#99918a;
                                font-size:11px;
                            ">
                                ${utilization.category}
                                •
                                ${utilization.description}
                                •
                                ${utilization.date}
                            </span>
                        </div>

                        <div style="
                            display:flex;
                            gap:8px;
                            margin-top:10px;
                        ">

                            <button
                                onclick="editUtilization(${actualIndex})"
                                style="
                                    border:none;
                                    background:#ef8354;
                                    color:white;
                                    padding:8px 14px;
                                    border-radius:8px;
                                    cursor:pointer;
                                "
                            >
                                ✏️ Edit
                            </button>

                            <button
                                onclick="deleteUtilization(${actualIndex})"
                                style="
                                    border:none;
                                    background:#d94f70;
                                    color:white;
                                    padding:8px 14px;
                                    border-radius:8px;
                                    cursor:pointer;
                                "
                            >
                                🗑️ Delete
                            </button>

                        </div>
                    `;

                    utilizationList.appendChild(
                        row
                    );
                }
            );
    }
}


// =========================================
// EDIT UTILIZATION
// =========================================

function editUtilization(index) {

    const utilizations =
        JSON.parse(
            localStorage.getItem(
                "utilizations"
            )
        ) || [];

    const utilization =
        utilizations[index];

    if (!utilization) {
        return;
    }

    document.getElementById(
        "utilizationAmount"
    ).value =
        utilization.amount || "";

    document.getElementById(
        "utilizationCategory"
    ).value =
        utilization.category || "";

    document.getElementById(
        "utilizationDate"
    ).value =
        utilization.date || "";

    document.getElementById(
        "utilizationDescription"
    ).value =
        utilization.description || "";

    editingUtilizationIndex =
        index;

    document.getElementById(
        "utilizationAmount"
    ).focus();

    alert(
        "Utilization details loaded. Edit the information and click Record Utilization to save the changes."
    );
}


// =========================================
// DELETE UTILIZATION
// =========================================

function deleteUtilization(index) {

    const utilizations =
        JSON.parse(
            localStorage.getItem(
                "utilizations"
            )
        ) || [];

    if (
        confirm(
            "Are you sure you want to delete this utilization record?"
        )
    ) {

        utilizations.splice(index, 1);

        localStorage.setItem(
            "utilizations",
            JSON.stringify(
                utilizations
            )
        );

        location.reload();
    }
}


// =========================================
// DONATION LIST
// =========================================

if (donationList) {

    const donations =
        JSON.parse(
            localStorage.getItem(
                "donations"
            )
        ) || [];

    donationList.innerHTML = "";

    if (donations.length === 0) {

        donationList.innerHTML = `
            <p style="
                color:#99918a;
                font-size:12px;
            ">
                No donations added yet.
            </p>
        `;

    } else {

        donations
            .slice()
            .reverse()
            .forEach(
                function (
                    donation,
                    reversedIndex
                ) {

                    const actualIndex =
                        donations.length -
                        1 -
                        reversedIndex;

                    const row =
                        document.createElement(
                            "div"
                        );

                    row.style.padding =
                        "18px 0";

                    row.style.borderBottom =
                        "1px solid #f1ece7";

                    let donationValue = "";

                    if (donation.amount) {

                        donationValue =
                            "₹" +
                            Number(
                                donation.amount
                            ).toLocaleString(
                                "en-IN"
                            );

                    } else {

                        donationValue =
                            donation.quantity +
                            " " +
                            donation.unit;
                    }

                    row.innerHTML = `
                        <div style="
                            display:flex;
                            justify-content:space-between;
                            align-items:flex-start;
                            gap:20px;
                        ">

                            <div>

                                <strong style="
                                    display:block;
                                    color:#46514d;
                                    font-size:14px;
                                    margin-bottom:6px;
                                ">
                                    ${donation.donorName}
                                </strong>

                                <span style="
                                    color:#99918a;
                                    font-size:11px;
                                ">
                                    ${donation.type}
                                    •
                                    ${donation.purpose}
                                    •
                                    ${donation.date}
                                </span>

                                <strong style="
                                    display:block;
                                    color:#378165;
                                    font-size:13px;
                                    margin-top:6px;
                                ">
                                    ${donationValue}
                                </strong>

                                <div class="donation-actions">

                                    <button
                                        class="edit-donation"
                                        onclick="editDonation(${actualIndex})"
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        class="delete-donation"
                                        onclick="deleteDonation(${actualIndex})"
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    `;

                    donationList.appendChild(
                        row
                    );
                }
            );
    }
}


// =========================================
// EDIT DONATION
// =========================================

function editDonation(index) {

    const donations =
        JSON.parse(
            localStorage.getItem(
                "donations"
            )
        ) || [];

    const donation =
        donations[index];

    if (!donation) {
        return;
    }

    document.getElementById(
        "donorName"
    ).value =
        donation.donorName || "";

    document.getElementById(
        "type"
    ).value =
        donation.type || "";

    document.getElementById(
        "amount"
    ).value =
        donation.amount || "";

    document.getElementById(
        "quantity"
    ).value =
        donation.quantity || "";

    document.getElementById(
        "unit"
    ).value =
        donation.unit || "";

    document.getElementById(
        "date"
    ).value =
        donation.date || "";

    document.getElementById(
        "purpose"
    ).value =
        donation.purpose || "";

    editingDonationIndex =
        index;

    document.getElementById(
        "donorName"
    ).focus();

    alert(
        "Donation details loaded. Edit the information and click Add Donation to save the changes."
    );
}


// =========================================
// DELETE DONATION
// =========================================

function deleteDonation(index) {

    const donations =
        JSON.parse(
            localStorage.getItem(
                "donations"
            )
        ) || [];

    if (
        confirm(
            "Are you sure you want to delete this donation?"
        )
    ) {

        donations.splice(index, 1);

        localStorage.setItem(
            "donations",
            JSON.stringify(
                donations
            )
        );

        location.reload();
    }
}