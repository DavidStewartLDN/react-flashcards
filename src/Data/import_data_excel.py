import openpyxl

wb = openpyxl.load_workbook('russian_phrases.xlsx')
ws = wb.active

for row in ws.iter_rows(min_row=2, max_col=3):
  for cell in row:
    print(cell.value)