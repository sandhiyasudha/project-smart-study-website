// student.js - manages subjects
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
window.subjects = subjects;

// DOM references (may not exist on all pages)
const addSubjectBtn = document.getElementById("addSubjectBtn");
const subjectNameInput = document.getElementById("subjectName");
const totalChaptersInput = document.getElementById("totalChapters");
const subjectListDiv = document.getElementById("subjectList");
const doneBtn = document.getElementById("doneBtn");

// Save subjects to localStorage
function saveSubjects() {
  localStorage.setItem("subjects", JSON.stringify(subjects));
  window.subjects = subjects;
}

// Render subjects if subjectListDiv exists
function renderSubjects() {
  if (!subjectListDiv) return; // safe: don't render on pages without subject input
  subjectListDiv.innerHTML = "";

  if (subjects.length === 0) {
    subjectListDiv.innerHTML = "<p>No subjects yet. Add one above.</p>";
    if (doneBtn) doneBtn.style.display = "none";
    return;
  }

  subjects.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "subject-item";
    div.innerHTML = `
      <b>${s.name}</b> - Completed: ${s.completed} / ${s.total}
      <div>
        <button onclick="markComplete(${i})">+ Complete</button>
        <button onclick="markSkipped(${i})">- Skip</button>
        <button onclick="deleteSubject(${i})">Delete</button>
      </div>
    `;
    subjectListDiv.appendChild(div);
  });

  if (doneBtn) doneBtn.style.display = "block";
}

// Add subject only if button exists
if (addSubjectBtn) {
  addSubjectBtn.addEventListener("click", () => {
    const name = subjectNameInput.value.trim();
    const total = parseInt(totalChaptersInput.value);

    if (!name || !total || total <= 0) {
      alert("Enter valid subject name and total chapters.");
      return;
    }

    subjects.push({ name, total, completed: 0 });
    saveSubjects();
    renderSubjects();

    subjectNameInput.value = "";
    totalChaptersInput.value = "";
  });
}

// Mark complete
function markComplete(index) {
  if (!subjects[index]) return;
  if (subjects[index].completed < subjects[index].total) {
    subjects[index].completed++;
    saveSubjects();
    renderSubjects();
  }
}

// Mark skipped
function markSkipped(index) {
  if (!subjects[index]) return;
  if (subjects[index].completed > 0) {
    subjects[index].completed--;
    saveSubjects();
    renderSubjects();
  }
}

// Delete subject
function deleteSubject(index) {
  if (!subjects[index]) return;
  if (confirm(`Delete ${subjects[index].name}?`)) {
    subjects.splice(index, 1);
    saveSubjects();
    renderSubjects();
  }
}

// Done → Go to Progress Tracker
if (doneBtn) {
  doneBtn.addEventListener("click", () => {
    alert("Subjects saved successfully!");
    window.location.href = "progress.html";
  });
}

// Initialize rendering (safe)
renderSubjects();