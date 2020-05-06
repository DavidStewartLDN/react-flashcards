import openpyxl

wb = openpyxl.load_workbook('russian_phrases.xlsx')
sheet = wb['Phrases']