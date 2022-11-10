from globals import *

cursor.execute("SELECT * FROM property_group")

propertyGroups = dict(cursor.fetchall())

properties = []

lastGroupIndex = None
i = 1
for group, value in rawPropertiesWithGroups:
    group = group.capitalize()
    if not "Unnamed" in group and group not in excludedGroups:
        lastGroupIndex = lookupIndex(group, propertyGroups)
    if lastGroupIndex is not None:
        if propertyHeaders[i - 1] not in excludedProperties:
            properties.append({"name": propertyHeaders[i - 1], "group": lastGroupIndex})
    i += 1

sql = "INSERT INTO properties (name, `group`) SELECT * FROM (SELECT %(name)s, %(group)s) AS tmp WHERE NOT EXISTS (SELECT name, `group` FROM properties WHERE name = (%(name)s) AND `group` = (%(group)s)) LIMIT 1"

insertData(sql, properties)