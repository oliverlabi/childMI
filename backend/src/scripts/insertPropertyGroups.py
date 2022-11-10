from globals import *

propertyGroups = []

for group in allPropertyGroups:
    if group not in propertyGroups and group not in excludedGroups:
        propertyGroups.append({"name":group})

sql = "INSERT INTO property_group (name) SELECT * FROM (SELECT (%(name)s)) AS tmp WHERE NOT EXISTS (SELECT name FROM property_group WHERE name = (%(name)s)) LIMIT 1"

insertData(sql, propertyGroups)