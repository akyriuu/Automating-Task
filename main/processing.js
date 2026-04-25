function processarEquipamentos(cinzaRaw, brancaRaw) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  // pra ficar tudo maiúsculo, sem espaços extras
  const parseIds = (raw) =>
    raw.split("\n")
       .map(s => s.trim().toUpperCase())
       .filter(s => s.length > 0);

  const idsCinza  = parseIds(cinzaRaw);
  const idsBranca = parseIds(brancaRaw);

  let verdes = 0, vermelhos = 0;

  function colorirCaixa(startRow, endRow, colMac, colNS, colEquip, idsPresentes) {
    for (let row = startRow; row <= endRow; row++) {
       if (row === 4) continue;
       if (row === 21) continue; //nos testes ele tava pintando a linha 4 e a linha 21, que está escrito equipamento, macs e ns, adicionei o if pra ele pular essa linha. 

      const mac = (sheet.getRange(row, colMac).getValue() || "").toString().toUpperCase().trim();
      const ns  = (sheet.getRange(row, colNS ).getValue() || "").toString().toUpperCase().trim();

      if (!mac && !ns) continue; // linha vazia, pula

      const presente = (mac && idsPresentes.includes(mac)) || (ns && idsPresentes.includes(ns));
      const cor = presente ? "#34a853" : "#e53935";

      // Pinta as 3 colunas da linha (equip, mac, ns)
      sheet.getRange(row, colEquip, 1, 3).setBackground(cor);

      presente ? verdes++ : vermelhos++;
    }
  }

  colorirCaixa(CINZA_START_ROW,  CINZA_END_ROW,  CINZA_COL_MAC,  CINZA_COL_NS,  CINZA_COL_EQUIP,  idsCinza);
  colorirCaixa(BRANCA_START_ROW, BRANCA_END_ROW, BRANCA_COL_MAC, BRANCA_COL_NS, BRANCA_COL_EQUIP, idsBranca);

  return `Pronto! ${verdes} na caixa (verde) · ${vermelhos} com cliente (vermelho)`;
}