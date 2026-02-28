/**
 * Google Apps Script: Automated NAAS Assessment Email & PDF Generator
 * Trigger: onFormSubmit
 * Purpose: Processes new NGO scoring submissions, calculates scores,
 *          generates insights, emails respondents, and saves PDFs to Drive.
 */

function onFormSubmit(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("NGO Scoring");
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Helper to get column index by header name
  const getColIndex = (name) =>
    headers.findIndex(h => (h || "").toString().toLowerCase().trim() === name.toLowerCase().trim());

  // === Column Indexes ===
  const emailIdx = getColIndex("Email address");
  const orgNameIdx = getColIndex("Organisation Name");
  const legalIdx = getColIndex("Legal_Total");
  const fundingIdx = getColIndex("Funding_Total");
  const staffingIdx = getColIndex("Staffing_Total");
  const projectIdx = getColIndex("Project_Total");
  const visibilityIdx = getColIndex("Visibility_Total");
  const recommendationIdx = getColIndex("Recommendation");
  const reasonIdx = getColIndex("Reason");

  // Ensure "Mail Status" column exists
  let mailStatusIdx = getColIndex("Mail Status");
  if (mailStatusIdx === -1) {
    mailStatusIdx = headers.length;
    sheet.getRange(1, mailStatusIdx + 1).setValue("Mail Status");
  }

  // Detect row number
  const rowNumber = e && e.range ? e.range.getRow() : sheet.getLastRow();
  const row = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).getValues()[0];

  // === Extract values ===
  const email = (row[emailIdx] || "").toString().trim();
  const orgName = (row[orgNameIdx] || "Your Organisation").toString().trim();
  const legal = Number(row[legalIdx]) || 0;
  const funding = Number(row[fundingIdx]) || 0;
  const staffing = Number(row[staffingIdx]) || 0;
  const project = Number(row[projectIdx]) || 0;
  const visibility = Number(row[visibilityIdx]) || 0;
  const recommendation = (row[recommendationIdx] || "No specific recommendation.").toString();
  const reason = (row[reasonIdx] || "No critical issues detected.").toString();

  // Skip if email invalid
  if (!email || email.indexOf("@") === -1) {
    sheet.getRange(rowNumber, mailStatusIdx + 1).setValue("⏩ Skipped - Missing/invalid email");
    return;
  }

  // === Define Area Maximum Scores ===
  const areaMax = {
    "Legal & Administration": 25,
    "Funding & Grants": 80,
    "Staffing & Operations": 40,
    "Project Design": 35,
    "Visibility & Media": 30
  };

  // === Build Problem Areas ===
  const problemAreas = [
    { key: "legal", label: "Legal & Administration", score: legal, max: areaMax["Legal & Administration"], service: "Registration & Compliance" },
    { key: "funding", label: "Funding & Grants", score: funding, max: areaMax["Funding & Grants"], service: "Grant Writing & Donor Access" },
    { key: "staffing", label: "Staffing & Operations", score: staffing, max: areaMax["Staffing & Operations"], service: "Staffing + Cost Optimization" },
    { key: "project", label: "Project Design", score: project, max: areaMax["Project Design"], service: "Project Structuring & M&E Setup" },
    { key: "visibility", label: "Visibility & Media", score: visibility, max: areaMax["Visibility & Media"], service: "Branding & Media Campaigns" }
  ];

  // === Helpers for status and color ===
  function pctStatus(pct) {
    if (pct >= 70) return "Sustainable";
    if (pct >= 34) return "Needs Support";
    return "Requires Attention";
  }
  function pctColor(pct) {
    if (pct >= 67) return "#4CAF50";
    if (pct >= 34) return "#e8f309";
    return "#F44336";
  }

  // Compute per-area percentages and statuses
  problemAreas.forEach(a => {
    a.pct = a.max > 0 ? Math.round((a.score / a.max) * 100) : 0;
    a.status = pctStatus(a.pct);
    a.color = pctColor(a.pct);
  });

  // === Overall Score ===
  const totalScoreNum = problemAreas.reduce((s, a) => s + a.score, 0);
  const totalMax = Object.values(areaMax).reduce((s, v) => s + v, 0);
  const totalPct = Math.round((totalScoreNum / totalMax) * 100);
  const overallLabel = pctStatus(totalPct);
  const overallColor = pctColor(totalPct);

  // Identify biggest challenge (lowest percentage area)
  const biggestIssue = problemAreas.reduce((min, a) => (a.pct < min.pct ? a : min), problemAreas[0]);

  // === Build Insights Table (HTML) ===
  let insightsTable = `
    <table style="border-collapse: collapse; width: 100%; margin-top:10px;">
      <tr style="background-color:#f4f4f4;">
        <th style="border:1px solid #ddd; padding:8px; text-align:left;">Problem Area</th>
        <th style="border:1px solid #ddd; padding:8px; text-align:center;">Score</th>
        <th style="border:1px solid #ddd; padding:8px; text-align:center;">% of Score</th>
        <th style="border:1px solid #ddd; padding:8px; text-align:center;">Status</th>
        <th style="border:1px solid #ddd; padding:8px; text-align:left;">NAAS Services</th>
      </tr>`;
  problemAreas.forEach(area => {
    insightsTable += `
      <tr>
        <td style="border:1px solid #ddd; padding:8px;">${area.label}</td>
        <td style="border:1px solid #ddd; padding:8px; text-align:center;">${area.score} / ${area.max}</td>
        <td style="border:1px solid #ddd; padding:8px; text-align:center;">${area.pct}%</td>
        <td style="border:1px solid #ddd; padding:8px; text-align:center; color:${area.color}; font-weight:bold;">${area.status}</td>
        <td style="border:1px solid #ddd; padding:8px;">${area.service}</td>
      </tr>`;
  });
  insightsTable += `</table>`;

  // === Compose Email ===
  const subject = `NAAS Assessment Results — ${orgName}`;
  const body = `
    <p>Dear <strong>${orgName}</strong>,</p>
    <p>Thank you for completing the NAAS assessment. Below is your personalised report.</p>
    <p><strong>Key Issues:</strong> ${reason}</p>
    <p><strong>Recommended NAAS Services:</strong> ${recommendation}</p>
    <p>Your biggest challenge is <strong>${biggestIssue.label}</strong>. Suggested intervention: <strong>${biggestIssue.service}</strong>.</p>
    <p>Book a 1-on-1 consultation below:</p>
    <div style="margin-top:25px; text-align:center;">
      <a href="https://calendar.app.google/j4mo7cAr2HM8m4mm6" target="_blank"
         style="background-color:#1E88E5; color:#fff; padding:12px 24px; border-radius:6px; font-size:16px; font-weight:bold; text-decoration:none; display:inline-block;">
         📅 Book a Free Consultation
      </a>
    </div>
    <p>Assessment Breakdown:</p>
    ${insightsTable}
    <p>Best regards,<br><strong>NAAS Team</strong></p>
  `;

  try {
    // Send email
    MailApp.sendEmail({ to: email, subject, htmlBody: body });

    // === PDF Generation & Drive Storage ===
    const parentFolderId = "1uK-c6omyHHX6PIg9c_UiSTP8IXc-HiTc"; // Replace with your Drive folder ID
    const parentFolder = DriveApp.getFolderById(parentFolderId);
    const safeOrgName = orgName.replace(/[^\w\s-]/g, "").trim();
    const subFolder = parentFolder.getFoldersByName(safeOrgName).hasNext()
      ? parentFolder.getFoldersByName(safeOrgName).next()
      : parentFolder.createFolder(safeOrgName);

    const pdfContent = `<h2>NAAS Respondent Report</h2>
      <p><strong>Organisation:</strong> ${orgName}</p>
      <h3>Analysis & Insights:</h3>${insightsTable}
      <h3>Recommendation:</h3><p>${recommendation}</p>
      <h3>Reason:</h3><p>${reason}</p>`;

    const pdf = HtmlService.createHtmlOutput(pdfContent).getAs("application/pdf")
                  .setName(`${safeOrgName}_Assessment.pdf`);
    const file = subFolder.createFile(pdf);

    // Send copy to company
    const companyEmail = "serveleadhumanitarian@gmail.com";
    MailApp.sendEmail({
      to: companyEmail,
      subject: `📄 NAAS Respondent Report — ${orgName}`,
      body: `PDF report stored here: ${file.getUrl()}`,
      attachments: [pdf]
    });

    sheet.getRange(rowNumber, mailStatusIdx + 1).setValue(`✅ Sent & Saved - ${new Date().toLocaleString()}`);

  } catch (err) {
    sheet.getRange(rowNumber, mailStatusIdx + 1).setValue(`❌ Failed - ${err.message}`);
  }
}
