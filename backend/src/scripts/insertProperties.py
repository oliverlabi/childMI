from globals import *

excludedGroups = [childDataGroupName]
excludedProperties = [commentProperty, childLanguageProperty, childLanguageExposureProperty]
cursor.execute("SELECT * FROM property_group WHERE sheet_id=" + currentSheetID)

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
        if propertyHeaders[i-1] not in excludedProperties:
            properties.append({"name": propertyHeaders[i-1], "group": lastGroupIndex, "sheet_id": currentSheetID})
    i += 1

sql = "INSERT INTO properties (name, `group`) SELECT * FROM (SELECT (%(name)s), (%(group)s)) AS tmp WHERE NOT EXISTS (SELECT p.name, p.`group` FROM properties p JOIN property_group g ON p.`group` = g.id WHERE p.name = (%(name)s) AND p.`group` = (%(group)s) AND g.sheet_id = (%(sheet_id)s)) LIMIT 1"

insertData(sql, properties)