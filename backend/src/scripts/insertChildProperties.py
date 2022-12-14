from config import *
childHeaders = lookupGroupProperties(childDataGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

cursor.execute(
    "SELECT child.id, name_code, age, gender, special_need "
    "FROM (SELECT * FROM child c1 WHERE NOT EXISTS "
        "(SELECT distinct cp.child_id, c2.id, s.id "
        "FROM child c2 "
        "INNER JOIN child_properties cp ON c2.id = cp.child_id "
        "INNER JOIN properties p ON p.id = cp.property_id "
        "INNER JOIN property_group pg ON pg.id = p.group "
        "INNER JOIN sheet s ON s.id = pg.sheet_id WHERE c1.id = c2.id)) child")

childData = list(cursor.fetchall())
childData = list(({"id": child_id, childHeaders[1]["name"]: name_code, childHeaders[2]["name"]: age,
                   childHeaders[3]["name"]: gender, childHeaders[4]["name"]: special_need}) for
                 (child_id, name_code, age, gender, special_need) in childData)

cursor.execute(
    "SELECT p.id, p.name, p.group FROM properties p JOIN property_group pg on p.`group` = pg.id WHERE pg.sheet_id = " + currentSheetID)

propertiesData = list(cursor.fetchall())
propertiesData = list(
    ({"id": propertyID, "name": propertyName, "group": group}) for (propertyID, propertyName, group) in propertiesData)

childProperties = []
excelChildNameData = dataframe.iloc[1:, [childHeaders[1]["index"], childHeaders[2]["index"], childHeaders[3]["index"],
                                         childHeaders[4]["index"]]]
excelPropertyValues = []

for property in propertiesData:
    dbPropertyID = property["id"]
    excelPropertyIndex = list(propertyHeaders).index(property["name"])
    excelPropertyValues = dataframe.iloc[1:, excelPropertyIndex]

    for i in range(0, len(excelPropertyValues)):
        childFirstHeaderData = str(excelChildNameData.iloc[0:, [0]].iloc[i, 0])
        childSecondHeaderData = excelChildNameData.iloc[0:, [1]].iloc[i, 0]
        childThirdHeaderData = str(excelChildNameData.iloc[0:, [2]].iloc[i, 0])
        childFourthHeaderData = str(excelChildNameData.iloc[0:, [3]].iloc[i, 0])

        dbChild = next((item for item in childData if (item[childHeaders[1]["name"]] == childFirstHeaderData or item[childHeaders[1]["name"]] == childNamePropertyEmpty) and
                        (item[childHeaders[2]["name"]] == childSecondHeaderData or item[childHeaders[2]["name"]] == childAgePropertyEmpty) and
                        (item[childHeaders[3]["name"]] == childThirdHeaderData or item[childHeaders[3]["name"]] == childGenderPropertyEmpty) and
                        item[childHeaders[4]["name"]] == childFourthHeaderData), None)

        if dbChild:
            dbChildID = dbChild["id"]

            if excelPropertyValues[i] != '':
                childProperties.append({"child_id": dbChildID, "property_id": dbPropertyID, "value": excelPropertyValues[i]})

sql = "INSERT INTO child_properties (child_id, property_id, value) SELECT * FROM (SELECT (%(child_id)s) AS childID, (%(property_id)s) AS propertyID, (%(value)s) AS value) AS tmp WHERE NOT EXISTS (SELECT child_id, property_id, value FROM child_properties WHERE child_id = (%(child_id)s) AND property_id = (%(property_id)s) AND value = (%(value)s)) LIMIT 1"

insertData(sql, childProperties)
