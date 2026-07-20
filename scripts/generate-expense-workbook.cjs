const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");

const outputDir = path.join(__dirname, "..", "public", "downloads");
const outputPath = path.join(
  outputDir,
  "expense-tracking-sheet-template.xlsx"
);

const categories = [
  "Housing",
  "Utilities",
  "Groceries",
  "Dining",
  "Transportation",
  "Health",
  "Insurance",
  "Shopping",
  "Entertainment",
  "Subscriptions",
  "Travel",
  "Education",
  "Business Expenses",
  "Savings",
  "Debt Payments",
  "Miscellaneous",
];

const paymentMethods = [
  "Cash",
  "Debit Card",
  "Credit Card",
  "ACH",
  "Bank Transfer",
  "PayPal",
  "Venmo",
  "Check",
];

const exampleTransactions = [
  [new Date(2026, 0, 7), "Grocery Store", "Groceries", 85.43, "Debit Card", "Weekly groceries"],
  [new Date(2026, 0, 1), "Rent Payment", "Housing", 1500.0, "ACH", "Monthly rent"],
  [new Date(2026, 0, 9), "Internet Bill", "Utilities", 79.99, "Credit Card", "Home internet"],
];

const budgetExamples = {
  Housing: 1500,
  Groceries: 600,
  Dining: 250,
  Transportation: 300,
};

const currencyFormat = '"$"#,##0.00;[Red]-"$"#,##0.00';
const percentFormat = "0.0%";
const border = {
  top: { style: "thin", color: { argb: "FFD9D9D9" } },
  left: { style: "thin", color: { argb: "FFD9D9D9" } },
  bottom: { style: "thin", color: { argb: "FFD9D9D9" } },
  right: { style: "thin", color: { argb: "FFD9D9D9" } },
};

function fillRange(worksheet, range, fill) {
  for (const row of worksheet.getRows(range.startRow, range.endRow - range.startRow + 1) || []) {
    for (let column = range.startCol; column <= range.endCol; column += 1) {
      row.getCell(column).fill = fill;
      row.getCell(column).border = border;
    }
  }
}

function styleSectionHeader(worksheet, cellRef, text, mergeTo) {
  worksheet.getCell(cellRef).value = text;
  if (mergeTo) {
    worksheet.mergeCells(`${cellRef}:${mergeTo}`);
  }
  const cell = worksheet.getCell(cellRef);
  cell.font = { name: "Aptos", bold: true, size: 14, color: { argb: "FF1F2937" } };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE5EEF9" } };
  cell.alignment = { vertical: "middle" };
  cell.border = border;
}

function styleTitle(worksheet, cellRef, text, mergeTo) {
  worksheet.getCell(cellRef).value = text;
  worksheet.mergeCells(`${cellRef}:${mergeTo}`);
  const cell = worksheet.getCell(cellRef);
  cell.font = { name: "Aptos Display", bold: true, size: 18, color: { argb: "FF111827" } };
  cell.alignment = { horizontal: "left", vertical: "middle" };
}

function setLabel(worksheet, cellRef, text) {
  const cell = worksheet.getCell(cellRef);
  cell.value = text;
  cell.font = { name: "Aptos", bold: true, size: 11, color: { argb: "FF374151" } };
}

function setInputCell(cell, value, numFmt) {
  cell.value = value;
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFEF3C7" } };
  cell.border = border;
  if (numFmt) {
    cell.numFmt = numFmt;
  }
}

function setFormulaCell(cell, formula, numFmt) {
  cell.value = { formula };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFEFF6FF" } };
  cell.border = border;
  if (numFmt) {
    cell.numFmt = numFmt;
  }
}

async function buildWorkbook() {
  fs.mkdirSync(outputDir, { recursive: true });

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "MangoGranola";
  workbook.company = "MangoGranola";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.calcProperties.fullCalcOnLoad = true;

  const transactions = workbook.addWorksheet("Transactions", {
    views: [{ state: "frozen", ySplit: 6 }],
  });
  const budget = workbook.addWorksheet("Budget & Category Summary", {
    views: [{ state: "frozen", ySplit: 4 }],
  });
  const dashboard = workbook.addWorksheet("Financial Dashboard", {
    views: [{ state: "frozen", ySplit: 4 }],
  });
  const lists = workbook.addWorksheet("Lists");
  lists.state = "hidden";

  styleTitle(transactions, "A1", "Expense Tracking Workbook", "F1");
  transactions.mergeCells("A2:F2");
  transactions.getCell("A2").value =
    "Enter transactions only on this worksheet. The summary and dashboard update automatically.";
  transactions.getCell("A2").font = { name: "Aptos", italic: true, color: { argb: "FF4B5563" } };
  transactions.mergeCells("A3:F3");
  transactions.getCell("A3").value =
    "Example rows are included for demonstration and may be deleted.";
  transactions.getCell("A3").font = { name: "Aptos", italic: true, color: { argb: "FF4B5563" } };
  styleSectionHeader(transactions, "A5", "Transactions", "F5");

  transactions.addTable({
    name: "TransactionsTable",
    ref: "A6",
    headerRow: true,
    style: {
      theme: "TableStyleMedium2",
      showRowStripes: true,
    },
    columns: [
      { name: "Date" },
      { name: "Description" },
      { name: "Category" },
      { name: "Amount" },
      { name: "Payment Method" },
      { name: "Notes" },
    ],
    rows: exampleTransactions,
  });

  transactions.columns = [
    { width: 14 },
    { width: 26 },
    { width: 22 },
    { width: 14 },
    { width: 18 },
    { width: 28 },
  ];

  for (let rowNumber = 7; rowNumber <= 500; rowNumber += 1) {
    const dateCell = transactions.getCell(`A${rowNumber}`);
    dateCell.numFmt = "yyyy-mm-dd";
    dateCell.border = border;
    transactions.getCell(`B${rowNumber}`).border = border;
    transactions.getCell(`C${rowNumber}`).border = border;
    transactions.getCell(`D${rowNumber}`).numFmt = currencyFormat;
    transactions.getCell(`D${rowNumber}`).border = border;
    transactions.getCell(`E${rowNumber}`).border = border;
    transactions.getCell(`F${rowNumber}`).border = border;
  }

  categories.forEach((value, index) => {
    lists.getCell(`A${index + 2}`).value = value;
  });
  paymentMethods.forEach((value, index) => {
    lists.getCell(`B${index + 2}`).value = value;
  });

  for (let rowNumber = 7; rowNumber <= 500; rowNumber += 1) {
    transactions.getCell(`C${rowNumber}`).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: ["Lists!$A$2:$A$17"],
      showErrorMessage: true,
      errorTitle: "Choose a category",
      error: "Select a category from the dropdown list.",
    };
    transactions.getCell(`E${rowNumber}`).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: ["Lists!$B$2:$B$9"],
      showErrorMessage: true,
      errorTitle: "Choose a payment method",
      error: "Select a payment method from the dropdown list.",
    };
  }

  styleTitle(budget, "A1", "Budget & Category Summary", "D1");
  budget.getRow(4).values = ["Category", "Budgeted", "Actual Spent", "Remaining"];
  budget.getRow(4).font = { name: "Aptos", bold: true };
  fillRange(budget, { startRow: 4, endRow: 4, startCol: 1, endCol: 4 }, {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFDCE6F1" },
  });

  categories.forEach((category, index) => {
    const rowNumber = index + 5;
    budget.getCell(`A${rowNumber}`).value = category;
    budget.getCell(`A${rowNumber}`).border = border;
    setInputCell(
      budget.getCell(`B${rowNumber}`),
      budgetExamples[category] ?? null,
      currencyFormat
    );
    setFormulaCell(
      budget.getCell(`C${rowNumber}`),
      `SUMIF(Transactions!$C$7:$C$500,A${rowNumber},Transactions!$D$7:$D$500)`,
      currencyFormat
    );
    setFormulaCell(
      budget.getCell(`D${rowNumber}`),
      `B${rowNumber}-C${rowNumber}`,
      currencyFormat
    );
  });

  budget.addConditionalFormatting({
    ref: "D5:D20",
    rules: [
      {
        type: "expression",
        formulae: ["AND($B5>0,$D5>$B5*0.1)"],
        style: {
          fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFC6EFCE" }, fgColor: { argb: "FFC6EFCE" } },
          font: { color: { argb: "FF006100" } },
        },
      },
      {
        type: "expression",
        formulae: ["AND($B5>0,$D5>=0,$D5<=$B5*0.1)"],
        style: {
          fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFFFEB9C" }, fgColor: { argb: "FFFFEB9C" } },
          font: { color: { argb: "FF9C6500" } },
        },
      },
      {
        type: "expression",
        formulae: ["$D5<0"],
        style: {
          fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFFFC7CE" }, fgColor: { argb: "FFFFC7CE" } },
          font: { color: { argb: "FF9C0006" } },
        },
      },
    ],
  });

  styleSectionHeader(budget, "A23", "Monthly Totals", "D23");
  setLabel(budget, "A24", "Total Budget");
  setLabel(budget, "A25", "Total Actual Spending");
  setLabel(budget, "A26", "Remaining Budget");
  setFormulaCell(budget.getCell("B24"), "SUM(B5:B20)", currencyFormat);
  setFormulaCell(budget.getCell("B25"), "SUM(C5:C20)", currencyFormat);
  setFormulaCell(budget.getCell("B26"), "SUM(D5:D20)", currencyFormat);
  fillRange(budget, { startRow: 24, endRow: 26, startCol: 1, endCol: 2 }, {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFF8FAFC" },
  });

  budget.columns = [
    { width: 22 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
  ];

  styleTitle(dashboard, "A1", "Financial Dashboard", "F1");
  dashboard.mergeCells("A2:F2");
  dashboard.getCell("A2").value =
    "Chart-ready summary tables are included below. Embedded charts can be added manually in Excel because the workbook generator does not reliably create native charts.";
  dashboard.getCell("A2").font = { name: "Aptos", italic: true, color: { argb: "FF4B5563" } };

  styleSectionHeader(dashboard, "A4", "Key Performance Indicators", "F4");
  setLabel(dashboard, "A5", "Total Expenses YTD");
  setFormulaCell(dashboard.getCell("B5"), "SUM(Transactions!$D$7:$D$500)", currencyFormat);
  setLabel(dashboard, "A6", "Current Month Expenses");
  setFormulaCell(
    dashboard.getCell("B6"),
    'SUMPRODUCT((YEAR(Transactions!$A$7:$A$500)=YEAR(TODAY()))*(MONTH(Transactions!$A$7:$A$500)=MONTH(TODAY()))*(Transactions!$D$7:$D$500))',
    currencyFormat
  );
  setLabel(dashboard, "A7", "Average Monthly Spending");
  setFormulaCell(dashboard.getCell("B7"), "IFERROR(AVERAGEIF(I24:I35,\">0\"),0)", currencyFormat);
  setLabel(dashboard, "D5", "Largest Expense Category");
  setFormulaCell(
    dashboard.getCell("E5"),
    "IFERROR(INDEX('Budget & Category Summary'!$A$5:$A$20,MATCH(MAX('Budget & Category Summary'!$C$5:$C$20),'Budget & Category Summary'!$C$5:$C$20,0)),\"\")"
  );
  setLabel(dashboard, "D6", "Number of Transactions");
  setFormulaCell(dashboard.getCell("E6"), "COUNT(Transactions!$D$7:$D$500)");
  setLabel(dashboard, "D7", "Average Transaction Amount");
  setFormulaCell(dashboard.getCell("E7"), "IFERROR(AVERAGE(Transactions!$D$7:$D$500),0)", currencyFormat);
  setLabel(dashboard, "D8", "Budget vs Actual Spending");
  setFormulaCell(
    dashboard.getCell("E8"),
    'TEXT(\'Budget & Category Summary\'!$B$24,"$#,##0.00")&" budget / "&TEXT(\'Budget & Category Summary\'!$B$25,"$#,##0.00")&" actual"'
  );

  styleSectionHeader(dashboard, "A10", "Monthly Review", "F10");
  setLabel(dashboard, "A11", "Highest Spending Category");
  setFormulaCell(
    dashboard.getCell("B11"),
    "IFERROR(INDEX('Budget & Category Summary'!$A$5:$A$20,MATCH(MAX('Budget & Category Summary'!$C$5:$C$20),'Budget & Category Summary'!$C$5:$C$20,0)),\"\")"
  );
  setLabel(dashboard, "A12", "Biggest Single Expense");
  setFormulaCell(dashboard.getCell("B12"), "MAX(Transactions!$D$7:$D$500)", currencyFormat);
  setLabel(dashboard, "A13", "Total Saved This Month");
  setInputCell(dashboard.getCell("B13"), null, currencyFormat);
  setLabel(dashboard, "A14", "Areas to Reduce Spending");
  dashboard.mergeCells("B14:F15");
  setInputCell(dashboard.getCell("B14"), "", null);
  setLabel(dashboard, "A16", "Financial Goals Next Month");
  dashboard.mergeCells("B16:F17");
  setInputCell(dashboard.getCell("B16"), "", null);
  dashboard.getCell("B14").alignment = { wrapText: true, vertical: "top" };
  dashboard.getCell("B16").alignment = { wrapText: true, vertical: "top" };

  styleSectionHeader(dashboard, "A19", "Year-End Summary", "F19");
  setLabel(dashboard, "A20", "Annual Income");
  setInputCell(dashboard.getCell("B20"), null, currencyFormat);
  setLabel(dashboard, "A21", "Annual Expenses");
  setFormulaCell(dashboard.getCell("B21"), "SUM(Transactions!$D$7:$D$500)", currencyFormat);
  setLabel(dashboard, "A22", "Net Savings");
  setFormulaCell(dashboard.getCell("B22"), "B20-B21", currencyFormat);
  setLabel(dashboard, "A23", "Savings Rate");
  setFormulaCell(dashboard.getCell("B23"), "IFERROR(B22/B20,0)", percentFormat);
  setLabel(dashboard, "A25", "Notes & Financial Insights");
  dashboard.mergeCells("B25:F28");
  setInputCell(dashboard.getCell("B25"), "", null);
  dashboard.getCell("B25").alignment = { wrapText: true, vertical: "top" };

  styleSectionHeader(dashboard, "H4", "Spending by Category", "I4");
  dashboard.getRow(5).values = [, , , , , , , "Category", "Actual Spent"];
  dashboard.getRow(5).font = { name: "Aptos", bold: true };
  categories.forEach((category, index) => {
    const rowNumber = index + 6;
    dashboard.getCell(`H${rowNumber}`).value = category;
    dashboard.getCell(`H${rowNumber}`).border = border;
    setFormulaCell(
      dashboard.getCell(`I${rowNumber}`),
      `'Budget & Category Summary'!C${index + 5}`,
      currencyFormat
    );
  });

  styleSectionHeader(dashboard, "K4", "Budget vs Actual", "M4");
  dashboard.getRow(5).getCell(11).value = "Category";
  dashboard.getRow(5).getCell(12).value = "Budgeted";
  dashboard.getRow(5).getCell(13).value = "Actual Spent";
  for (let column = 11; column <= 13; column += 1) {
    dashboard.getRow(5).getCell(column).font = { name: "Aptos", bold: true };
    dashboard.getRow(5).getCell(column).border = border;
    dashboard.getRow(5).getCell(column).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFDCE6F1" },
    };
  }
  categories.forEach((category, index) => {
    const rowNumber = index + 6;
    dashboard.getCell(`K${rowNumber}`).value = category;
    dashboard.getCell(`K${rowNumber}`).border = border;
    setFormulaCell(
      dashboard.getCell(`L${rowNumber}`),
      `'Budget & Category Summary'!B${index + 5}`,
      currencyFormat
    );
    setFormulaCell(
      dashboard.getCell(`M${rowNumber}`),
      `'Budget & Category Summary'!C${index + 5}`,
      currencyFormat
    );
  });

  styleSectionHeader(dashboard, "H22", "Monthly Expenses", "I22");
  dashboard.getCell("H23").value = "Month";
  dashboard.getCell("I23").value = "Expenses";
  dashboard.getCell("H23").font = { name: "Aptos", bold: true };
  dashboard.getCell("I23").font = { name: "Aptos", bold: true };
  for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
    const rowNumber = monthIndex + 24;
    dashboard.getCell(`H${rowNumber}`).value = new Date(new Date().getFullYear(), monthIndex, 1);
    dashboard.getCell(`H${rowNumber}`).numFmt = "mmm yyyy";
    dashboard.getCell(`H${rowNumber}`).border = border;
    setFormulaCell(
      dashboard.getCell(`I${rowNumber}`),
      `SUMPRODUCT((YEAR(Transactions!$A$7:$A$500)=YEAR(H${rowNumber}))*(MONTH(Transactions!$A$7:$A$500)=MONTH(H${rowNumber}))*(Transactions!$D$7:$D$500))`,
      currencyFormat
    );
  }

  styleSectionHeader(dashboard, "K22", "Payment Method Breakdown", "L22");
  dashboard.getCell("K23").value = "Payment Method";
  dashboard.getCell("L23").value = "Expenses";
  dashboard.getCell("K23").font = { name: "Aptos", bold: true };
  dashboard.getCell("L23").font = { name: "Aptos", bold: true };
  paymentMethods.forEach((method, index) => {
    const rowNumber = index + 24;
    dashboard.getCell(`K${rowNumber}`).value = method;
    dashboard.getCell(`K${rowNumber}`).border = border;
    setFormulaCell(
      dashboard.getCell(`L${rowNumber}`),
      `SUMIF(Transactions!$E$7:$E$500,K${rowNumber},Transactions!$D$7:$D$500)`,
      currencyFormat
    );
  });

  styleSectionHeader(dashboard, "H38", "Top 5 Expense Categories", "J38");
  dashboard.getCell("H39").value = "Rank";
  dashboard.getCell("I39").value = "Category";
  dashboard.getCell("J39").value = "Amount";
  dashboard.getRow(39).font = { name: "Aptos", bold: true };
  for (let rank = 1; rank <= 5; rank += 1) {
    const rowNumber = rank + 39;
    dashboard.getCell(`H${rowNumber}`).value = rank;
    dashboard.getCell(`H${rowNumber}`).border = border;
    setFormulaCell(
      dashboard.getCell(`I${rowNumber}`),
      `IFERROR(INDEX('Budget & Category Summary'!$A$5:$A$20,MATCH(LARGE('Budget & Category Summary'!$C$5:$C$20,${rank}),'Budget & Category Summary'!$C$5:$C$20,0)),\"\")`
    );
    setFormulaCell(
      dashboard.getCell(`J${rowNumber}`),
      `IFERROR(LARGE('Budget & Category Summary'!$C$5:$C$20,${rank}),0)`,
      currencyFormat
    );
  }

  dashboard.columns = [
    { width: 24 },
    { width: 18 },
    { width: 4 },
    { width: 22 },
    { width: 24 },
    { width: 18 },
    { width: 3 },
    { width: 18 },
    { width: 16 },
    { width: 4 },
    { width: 20 },
    { width: 16 },
    { width: 16 },
  ];

  await workbook.xlsx.writeFile(outputPath);
  return outputPath;
}

buildWorkbook()
  .then((filePath) => {
    console.log(`Workbook created at ${filePath}`);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });