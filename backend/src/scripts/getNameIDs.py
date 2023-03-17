from config import *
import csv

cursor.execute("SELECT id, name_code FROM child")
childData = list(cursor.fetchall())
childIds = list(child_id for (child_id, name_code) in childData)
childNames = list(name_code for (child_id, name_code) in childData)

with open("names.csv", "w", newline='') as csv_file:
    writer = csv.writer(csv_file, delimiter=',')
    writer.writerow(("Identifikaator", "Nimi"))
    writer.writerows(zip(childIds, childNames))
