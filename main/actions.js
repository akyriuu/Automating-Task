function limparCores() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const linhasCinza  = CINZA_END_ROW  - CINZA_START_ROW  + 1;
  const linhasBranca = BRANCA_END_ROW - BRANCA_START_ROW + 1;

  sheet.getRange(CINZA_START_ROW,  CINZA_COL_EQUIP,  linhasCinza,  3).setBackground(null);
  sheet.getRange(BRANCA_START_ROW, BRANCA_COL_EQUIP, linhasBranca, 3).setBackground(null);

  SpreadsheetApp.getUi().alert("Cores removidas.");
}