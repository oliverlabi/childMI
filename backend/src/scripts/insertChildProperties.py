from config import *

cursor.execute("SELECT id, name_code FROM child")

childData = list(cursor.fetchall())
childData = list(({"id": child_id, "name_code": name_code}) for (child_id, name_code) in childData)

cursor.execute("SELECT p.id, p.name, p.group FROM properties p JOIN property_group pg on p.`group` = pg.id WHERE pg.sheet_id = " + currentSheetID)

propertiesData = list(cursor.fetchall())
propertiesData = list(({"id": propertyID, "name": propertyName, "group": group}) for (propertyID, propertyName, group) in propertiesData)

childProperties = []
excelChildNamePropertyIndex = list(propertyHeaders).index(childNameProperty)
excelChildNameData = dataframe.iloc[1:, excelChildNamePropertyIndex:excelChildNamePropertyIndex+1].values
excelPropertyValues = []

for property in propertiesData:
    dbPropertyID = property["id"]
    excelPropertyIndex = list(propertyHeaders).index(property["name"])
    excelPropertyValues = dataframe.iloc[1:, excelPropertyIndex]

    for i in range(0, len(excelPropertyValues)):
        dbChildID = lookupDictInList(str(excelChildNameData[i][0]), childData, "name_code")["id"]

        if excelPropertyValues[i] != '':
            childProperties.append({"child_id": dbChildID, "property_id": dbPropertyID, "value": excelPropertyValues[i]})

sql = "INSERT INTO child_properties (child_id, property_id, value) SELECT * FROM (SELECT (%(child_id)s) AS childID, (%(property_id)s) AS propertyID, (%(value)s) AS value) AS tmp WHERE NOT EXISTS (SELECT child_id, property_id, value FROM child_properties WHERE child_id = (%(child_id)s) AND property_id = (%(property_id)s) AND value = (%(value)s)) LIMIT 1"

insertData(sql, childProperties)