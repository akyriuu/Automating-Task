const SHEET_NAME = "Página1"; // TEM QUE FICAR EXATAMENTE ESSE NOME LÁ NO NOME PÁGINA, CASO FOR ALTERAR, TEM QUE ALTERAR AQUI TBM EM


// eu tentei separar os arquivos de script pra manter boas práticas de código mas ele vai bugar algumas funções, vai ter que ficar assim mesmo tudo junto por enquanto, eu que faço a manutenção dessa bomba msm//

// Caixa Cinza — linhas e colunas (base 1) > START_ROW e END_ROW é  a área que ele pinta, por padrão deixei até 23 que é até 2 itens de retorno por retirada, 2 e 23 são as linhas.
const CINZA_START_ROW = 2;
const CINZA_END_ROW   = 29;
const CINZA_COL_EQUIP = 4;  // D - nome do equipamento
const CINZA_COL_MAC   = 5;  // E - MAC
const CINZA_COL_NS    = 6;  // F - Número de Série

// Caixa Branca — linhas e colunas (base 1)
const BRANCA_START_ROW = 2;
const BRANCA_END_ROW   = 29;
const BRANCA_COL_EQUIP = 8;  // H - nome do equipamento
const BRANCA_COL_MAC   = 9;  // I - MAC
const BRANCA_COL_NS    = 10; // J - Número de Série

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Controle de Caixa")
    .addItem("Registrar equipamentos presentes", "abrirDialogo")
    .addSeparator()
    .addItem("Limpar cores", "limparCores")
    .addToUi();
}

function abrirDialogo() {
  const html = HtmlService.createHtmlOutput(`
    <style>
      body { font-family: Arial, sans-serif; padding: 16px; font-size: 14px; }
      label { font-weight: bold; display: block; margin-top: 14px; margin-bottom: 4px; }
      textarea { width: 100%; height: 90px; font-size: 12px; font-family: monospace; padding: 6px; box-sizing: border-box; }
      p.hint { color: #666; font-size: 12px; margin: 4px 0 10px; }
      button { margin-top: 16px; padding: 9px 0; background: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; width: 100%; }
    </style>
    <p class="hint">Cole os MACs <b>ou</b> Números de Série dos equipamentos que estão fisicamente na caixa agora (Tem que ser um em cada linha como no exemplo, pode misturar MAC e NS. ).</p>

    <label>Caixa Cinza — Conchal</label>
    <textarea id="cinza" placeholder="84:06:FA:A7:AE:C8&#10;SN123456&#10;EC:E6:A2:F3:E7:70"></textarea>

    <label>Caixa Branca — Mogi</label>
    <textarea id="branca" placeholder="48:51:CF:90:9D:30&#10;SN789012&#10;80:85:44:1A:4B:5B"></textarea>

    <button onclick="enviar()">Confirmar e colorir</button>

    <script>
      function enviar() {
        const cinza  = document.getElementById('cinza').value;
        const branca = document.getElementById('branca').value;
        google.script.run
          .withSuccessHandler(function(msg) { alert(msg); google.script.host.close(); })
          .withFailureHandler(function(err) { alert('Erro: ' + err.message); })
          .processarEquipamentos(cinza, branca);
      }
    <\/script>
  `)
  .setWidth(400)
  .setHeight(370)
  .setTitle("Quais equipamentos estão na caixa?");

  SpreadsheetApp.getUi().showModalDialog(html, "Quais equipamentos estão na caixa?");
}