/**
 * Code.gs - Google Apps Script for Sema Rak Box Form
 *
 * Instructions:
 * 1. Create a new Google Sheet.
 * 2. In the menu, go to Extensions > Apps Script.
 * 3. Replace all the code in Code.gs with this script.
 * 4. Save and click "Deploy" > "New deployment".
 * 5. Select type: "Web app".
 * 6. Set "Execute as" to "Me" and "Who has access" to "Anyone".
 * 7. Click Deploy, authorize the app, and copy the Web App URL.
 * 8. Paste the Web App URL into the `script.js` file of the website.
 */

var SHEET_NAME = "Sheet1"; // Change if your sheet name is different

function doPost(e) {
  try {
    // ใช้ ID ของ Sheet ที่คุณครูให้มาโดยตรง จะได้ชัวร์ 100% ว่ามันเจอไฟล์แน่นอน
    var doc = SpreadsheetApp.openById(
      "1wsxLMrkyB3egLW7OS5M-aSmcbeRvgRW_UQ_Z9ozZJZY",
    );
    var sheet = doc.getSheetByName(SHEET_NAME);

    // ถ้าไม่เจอ Sheet ชื่อ "Sheet1" ให้ดึง Sheet แรกสุดมาใช้เลย
    if (!sheet) {
      sheet = doc.getSheets()[0];
    }

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Topic",
        "Details",
        "Informant Name",
        "Contact Info",
      ]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
    }

    // Get data from the POST request
    var data = e.parameter;

    var topic = data.topic || "Unknown";
    var details = data.details || "No details provided";
    var informantName = data.informantName || "Anonymous";
    var contactInfo = data.contactInfo || "None";

    // Timestamp
    var timestamp = new Date();

    // Append row to sheet
    sheet.appendRow([timestamp, topic, details, informantName, contactInfo]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", data: JSON.stringify(data) }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
