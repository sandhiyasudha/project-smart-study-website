// Get canvas
const ctx = document.getElementById("progressChart").getContext("2d");

// Load subjects from localStorage
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

if (subjects.length === 0) {
  alert("Add subjects first in Student Details!");
}

// Prepare data
const labels = subjects.map(s => s.name);
const completedData = subjects.map(s => s.completed);
const remainingData = subjects.map(s => s.total - s.completed);

const data = {
  labels: labels,
  datasets: [
    {
      label: "Completed Chapters",
      data: completedData,
      backgroundColor: "rgba(142, 45, 226, 0.8)"
    },
    {
      label: "Remaining Chapters",
      data: remainingData,
      backgroundColor: "rgba(74, 0, 224, 0.5)"
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Progress Tracker" }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1 },
      title: { display: true, text: "Chapters" }
    }
  }
};

// Create chart
new Chart(ctx, {
  type: "bar",
  data: data,
  options: options
});