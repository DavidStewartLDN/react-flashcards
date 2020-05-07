import openpyxl
import json

wb = openpyxl.load_workbook('russian_phrases.xlsx')
ws = wb.active
output_file_name = 'russian_cards.json'

data = {}
data['russian_cards'] = []
counter = 1

for row in ws.iter_rows(min_row=2, max_col=3):
  data['russian_cards'].append({
    'id': counter,
    'type': row[0].value,
    'russian': row[1].value,
    'english': row[2].value
  })
  counter +=1

with open(output_file_name, 'w', encoding='utf-8') as outfile:
    json.dump(data, outfile, indent=2, ensure_ascii=False)

print(f"Data has successfully be output to {output_file_name}! Get learning :)")