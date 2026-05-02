
### ENGLISH - DESCRIPTION.


This Google Apps Script is used to control equipment presence in two physical boxes using a Google Spreadsheet.

You'll need to first add it inside a script, using the EXTENSION optiion inside the Google Spreadsheets

It adds a custom menu called `Controle de Caixa` when the spreadsheet is opened.

<img width="800" height="362" alt="ezgif-4a40878bc32bcd3f" src="https://github.com/user-attachments/assets/59bddbfc-a57f-4106-ae5b-5088456614ab" />

Menu options:
- `Registrar equipamentos presentes`: opens a dialog where you paste the MAC addresses and/or Serial Numbers currently inside each box.
- `Limpar cores`: clears all color highlights from the monitored ranges.

How it works:
- The script reads identifiers for:
	- `Gray Box —City 1`
	- `White Box — City 2`
- Input can contain MACs, Serial Numbers, or both, one per line.
- Values are normalized to uppercase and trimmed.
- For each configured row, the script checks columns for MAC and Serial Number.
- If either identifier exists in the pasted list, the row is marked as present (`green`, `#34a853`).
- If not found, the row is marked as not in the box (`red`, `#e53935`).
- Empty rows are skipped.
- Rows `4` and `21` are intentionally skipped.

Result message:
- After processing, it returns a summary with total green and red items.

Sheet and range configuration:
- `SHEET_NAME` must match the exact sheet tab name in the spreadsheet.
- Gray box (`Cinza`) uses columns `D:E:F` from rows `2` to `29`.
- White box (`Branca`) uses columns `H:I:J` from rows `2` to `29`.

File organization:
- `main/interface.js`: constants, custom menu, and dialog UI.
- `main/processing.js`: comparison logic and row coloring.
- `main/actions.js`: utility action to clear colors.

Important:
- This project is designed for Google Apps Script bound to a Google Spreadsheet.
- Keep constants and function names unchanged unless you also update all references.

### PORTUGUÊS - DESCRIÇÃO.

Este Google Apps Script serve para controlar a presença de equipamentos em duas caixas físicas usando uma planilha do Google Sheets.


Você primeiro precisará adicionar isto dentro de um script, usando a opção EXTENSÕES dentro do Google Spreadsheets

Ele adiciona um menu personalizado chamado `Controle de Caixa` ao abrir a planilha.

Opções do menu:
- `Registrar equipamentos presentes`: abre um diálogo para colar os MACs e/ou Números de Série que estão fisicamente dentro de cada caixa.
- `Limpar cores`: remove as marcações de cor das áreas monitoradas.

Como funciona:
- O script lê identificadores para:
	- `Caixa Cinza — Cidade 1`
	- `Caixa Branca — Cidade 2`
- A entrada pode ter MAC, Número de Série, ou os dois, sempre um por linha.
- Os valores são normalizados para maiúsculo e sem espaços extras.
- Em cada linha configurada, o script verifica as colunas de MAC e Número de Série.
- Se um dos identificadores estiver na lista colada, a linha é marcada como presente (`verde`, `#34a853`).
- Se não estiver, a linha é marcada como fora da caixa (`vermelho`, `#e53935`).
- Linhas vazias são ignoradas.
- As linhas `4` e `21` são puladas de propósito.

Mensagem de resultado:
- Após o processamento, o script retorna um resumo com quantidade em verde e em vermelho.

Configuração de aba e intervalos:
- `SHEET_NAME` precisa ser exatamente igual ao nome da aba na planilha.
- Caixa cinza (`Cinza`) usa colunas `D:E:F`, linhas `2` a `29`.
- Caixa branca (`Branca`) usa colunas `H:I:J`, linhas `2` a `29`.

Organização dos arquivos:
- `main/interface.js`: constantes, menu personalizado e interface do diálogo.
- `main/processing.js`: lógica de comparação e pintura das linhas.
- `main/actions.js`: ação utilitária para limpar cores.

Importante:
- Este projeto foi feito para Google Apps Script vinculado a uma planilha Google Sheets.
- Evite mudar nomes de constantes e funções sem ajustar também todas as referências.
