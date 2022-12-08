from config import *

cursor.execute(
    "SELECT c1.id, c1.name_code, c1.age, c1.gender, c1.special_need FROM child c1 WHERE NOT EXISTS (SELECT cp.child_id, c2.id FROM child c2 INNER JOIN child_properties cp ON c2.id = cp.child_id WHERE c1.id = c2.id)")
childHeaders = lookupGroupProperties(childDataGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

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
        childFirstHeader = str(excelChildNameData.iloc[0:, [0]].iloc[i, 0])
        childSecondHeader = int(excelChildNameData.iloc[0:, [1]].iloc[i, 0])
        if childSecondHeader == '' and childHeaders[2]["name"] == childAgeProperty:
            childSecondHeader = 0
        childThirdHeader = str(excelChildNameData.iloc[0:, [2]].iloc[i, 0])
        if childThirdHeader == '' and childHeaders[3]["name"] == childGenderProperty:
            childThirdHeader = "E"
        childFourthHeader = str(excelChildNameData.iloc[0:, [3]].iloc[i, 0])
        if childFourthHeader == '':
            childFourthHeader = "null"

        try:
            dbChildID = next(item for item in childData if item[childHeaders[1]["name"]] == childFirstHeader and item[
                childHeaders[2]["name"]] == childSecondHeader and item[childHeaders[3]["name"]] == childThirdHeader and
                             item[childHeaders[4]["name"]] == childFourthHeader)["id"]
            if excelPropertyValues[i] != '':
                childProperties.append(
                    {"child_id": dbChildID, "property_id": dbPropertyID, "value": excelPropertyValues[i]})
        except:
            print("Warning: Error with appending value: ", childFirstHeader, childSecondHeader, childThirdHeader, childFourthHeader)
            pass

sql = "INSERT INTO child_properties (child_id, property_id, value) SELECT * FROM (SELECT (%(child_id)s) AS childID, (%(property_id)s) AS propertyID, (%(value)s) AS value) AS tmp WHERE NOT EXISTS (SELECT child_id, property_id, value FROM child_properties WHERE child_id = (%(child_id)s) AND property_id = (%(property_id)s) AND value = (%(value)s)) LIMIT 1"

insertData(sql, childProperties)
