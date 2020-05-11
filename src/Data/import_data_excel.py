import openpyxl
import json

wb = openpyxl.load_workbook('translated_phrases.xlsx')
ws = [wb['russian'], wb['chinese'], wb['italian']]
output_file_name = 'cards.json'

data = {}
data['russian'] = []
data['chinese'] = []
data['italian'] = []

for sheet in ws:
  counter = 1
  for row in sheet.iter_rows(min_row=2, max_col=4):
    data[sheet.title].append({
      'id': counter,
      'type': row[0].value,
      'native': row[1].value,
      'english': row[2].value,
      'latin_script': row[3].value
    })
    counter +=1

with open(output_file_name, 'w', encoding='utf-8') as outfile:
    json.dump(data, outfile, indent=2, ensure_ascii=False)

print(f"Data has successfully be output to {output_file_name}! Get learning :)")