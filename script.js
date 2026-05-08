const IED_SCORE_SHEET = 'IED_Runner_Scores';
const POE_SCORE_SHEET = 'PoEkemon_Scores'; // NEW: Dedicated PoEkemon Tab
const BANNED_SHEET_NAME = 'Banned_IPs';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    
    // NEW: Route to the correct tab based on the game sending the data
    let targetSheetName = IED_SCORE_SHEET;
    if (data.game === "PoEkemon") {
        targetSheetName = POE_SCORE_SHEET;
    }
    
    let sheet = ss.getSheetByName(targetSheetName);
    
    // Auto-create the PoEkemon tab if it doesn't exist yet
    if (!sheet && data.game === "PoEkemon") {
        sheet = ss.insertSheet(POE_SCORE_SHEET);
        sheet.appendRow(["Timestamp", "Trainer Name", "Final Score", "Selfie Code", "Unit", "IP", "Status"]);
    }
    
    // 1. Log the attempt on the appropriate scores sheet
    if (data.game === "PoEkemon") {
        // PoEkemon Specific Layout
        sheet.appendRow([
          new Date(),
          data.name,
          data.score,
          data.selfieCode,
          data.unit,
          data.ip,
          data.banned ? "FLAGGED" : "CLEAN"
        ]);
    } else {
        // Legacy IED Runner Layout
        sheet.appendRow([
          new Date(),
          data.name,
          data.score,
          data.char,
          data.mode,
          data.unit,
          data.ip,
          data.banned ? "FLAGGED" : "CLEAN"
        ]);
    }
    
    // 2. AUTO-BAN LOGIC: If banned, write the IP to the Banned_IPs tab
    if (data.banned && data.ip && data.ip !== "Unknown") {
      let bannedSheet = ss.getSheetByName(BANNED_SHEET_NAME);
      
      // Auto-create the tab if you haven't made it yet
      if (!bannedSheet) {
         bannedSheet = ss.insertSheet(BANNED_SHEET_NAME);
         bannedSheet.appendRow(["Blocked IPs", "Timestamp", "Attempted Name"]);
      }
      
      // Prevent duplicating the same IP if they try multiple times
      const bannedData = bannedSheet.getDataRange().getValues();
      let alreadyBanned = false;
      for(let i = 1; i < bannedData.length; i++) {
        if(bannedData[i][0] === data.ip) { 
            alreadyBanned = true; 
            break; 
        }
      }
      
      if(!alreadyBanned) {
        bannedSheet.appendRow([data.ip, new Date(), data.name]);
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get the High Scores (Defaulting to IED Runner for backwards compatibility)
  const scoreSheet = ss.getSheetByName(IED_SCORE_SHEET);
  const jsonScores = [];
  
  if (scoreSheet) {
      const scoreData = scoreSheet.getDataRange().getValues();
      const scoreRows = scoreData.slice(1);
      for (let row of scoreRows) {
        if (row[7] !== "FLAGGED") {
          jsonScores.push({
            timestamp: row[0],
            name: row[1],
            score: row[2],
            char: row[3],
            mode: row[4],
            unit: row[5]
          });
        }
      }
  }

  // Get the Banned IPs
  let bannedIPs = [];
  const bannedSheet = ss.getSheetByName(BANNED_SHEET_NAME);
  if (bannedSheet) {
    const bannedData = bannedSheet.getDataRange().getValues();
    const bannedRows = bannedData.slice(1);
    for (let row of bannedRows) {
      if (row[0]) {
        bannedIPs.push(row[0].toString().trim());
      }
    }
  }
  
  // Send BOTH lists back to the game
  const payload = {
    scores: jsonScores,
    banned: bannedIPs
  };
  
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
