# By Guss
# Input data member to google sheets

```js
function doPost(e) {
  const sheetId = "";
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName("Sheet1");

  const data = [
    e.parameter.nama,
    e.parameter.nick_coc,
    e.parameter.total_akun,
    e.parameter.username_tiktok,
    e.parameter.tanggal_lahir,
    e.parameter.kesibukan,
    e.parameter.status_pernikahan,
    e.parameter.jenis_kelamin,
    e.parameter.asal,
    e.parameter.no_wa,
    e.parameter.ip_address,
  ];

  const lastRow = sheet.getLastRow() + 1;
  sheet.getRange(lastRow, 1, 1, data.length).setValues([data]);

  sheet.getRange(lastRow, 1, 1, data.length).setHorizontalAlignment("center");

  return ContentService.createTextOutput("Success");
}

```