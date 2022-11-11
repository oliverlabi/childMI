from globals import *

propertyGroups = []

for group in allPropertyGroups:
    if group not in propertyGroups and group not in excludedGroups:
        propertyGroups.append({"name":group, "sheet_id":currentSheetID})

sql = "INSERT INTO property_group (name, sheet_id) SELECT * FROM (SELECT (%(name)s), (%(sheet_id)s)) AS tmp WHERE NOT EXISTS (SELECT name, sheet_id FROM property_group WHERE name = (%(name)s) AND sheet_id = (%(sheet_id)s)) LIMIT 1"

insertData(sql, propertyGroups)