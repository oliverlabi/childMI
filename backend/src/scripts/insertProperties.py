from globals import *

cursor.execute("SELECT * FROM property_group")

propertyGroups = list(cursor.fetchall())
propertyGroups = list(({"id":id, "name":name, "sheet_id":sheet_id}) for (id, name, sheet_id) in propertyGroups)

properties = []

lastGroupIndex = None
i = 1
for group, value in rawPropertiesWithGroups:
    group = group.capitalize()

    if not "Unnamed" in group and group not in excludedGroups:
        lastGroupIndex = lookupDictInList(group, propertyGroups, "name")["id"]
    if lastGroupIndex is not None:
        if propertyHeaders[i - 1] not in excludedProperties:
            properties.append({"name": propertyHeaders[i - 1], "group": lastGroupIndex})
    i += 1

sql = "INSERT INTO properties (name, `group`) SELECT * FROM (SELECT %(name)s, %(group)s) AS tmp WHERE NOT EXISTS (SELECT name, `group` FROM properties WHERE name = (%(name)s) AND `group` = (%(group)s)) LIMIT 1"

insertData(sql, properties)