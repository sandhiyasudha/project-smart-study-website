document.addEventListener("DOMContentLoaded", () => {
  let subjects = window.subjects || [];
  const timetableOutput = document.getElementById("timetableOutput");
  const normalBtn = document.getElementById("generateNormal");
  const examBtn = document.getElementById("generateExam");
  const doneBtn = document.getElementById("doneTimetable");

  // ------------------ NORMAL TIMETABLE -------------------
  normalBtn.addEventListener("click", () => {
    const hoursPerDay = parseInt(document.getElementById("availableHours").value);
    const days = parseInt(document.getElementById("studyDays").value);

    if (!hoursPerDay || !days) { alert("Enter valid hours and days"); return; }
    if (!subjects.length) { alert("Add subjects first!"); return; }

    let html = "<h2>Normal Study Timetable</h2>";

    // For each day
    for (let day = 1; day <= days; day++) {
      html += `<h3>Day ${day}</h3><ul>`;

      // For each subject, calculate chapters for today
      subjects.forEach(s => {
        const remainingChapters = s.total - s.completed;
        if (remainingChapters <= 0) return;

        const chaptersToday = Math.ceil(s.total / days);
        const chaptersToStudy = Math.min(chaptersToday, remainingChapters);

        html += `<li>${s.name}: Study ${chaptersToStudy} chapter(s)</li>`;
        s.completed += chaptersToStudy;
      });

      html += "</ul>";
    }

    timetableOutput.innerHTML = html;
    doneBtn.style.display = "block";
  });

  // ------------------ EXAM TIMETABLE -------------------
  examBtn.addEventListener("click", () => {
    const examSub = document.getElementById("examSubject").value.trim();
    const examChapters = parseInt(document.getElementById("examTotalChapters").value);
    const eveningHours = parseInt(document.getElementById("examEveningHours").value);
    const morningHours = parseInt(document.getElementById("examMorningHours").value);

    if (!examSub || !examChapters || !eveningHours || !morningHours) {
      alert("Enter all exam details!"); return;
    }

    const totalHours = eveningHours + morningHours;
    const chaptersPerHour = examChapters / totalHours;

    let html = `<h2>Exam Timetable for ${examSub}</h2><ul>`;

    // Split chapters proportionally
    const eveningChapters = Math.ceil(eveningHours * chaptersPerHour);
    const morningChapters = examChapters - eveningChapters;

    html += `<li>Evening: Study ${eveningChapters} chapter(s) in ${eveningHours} hour(s)</li>`;
    html += `<li>Morning: Study ${morningChapters} chapter(s) in ${morningHours} hour(s)</li>`;
    html += "</ul>";

    timetableOutput.innerHTML = html;
    doneBtn.style.display = "block";
  });

  doneBtn.addEventListener("click", () => {
    window.location.href = "recommendation.html";
  });
});