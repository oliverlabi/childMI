from config import *

childHeaders = lookupGroupProperties(childDataGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

cursor.execute("SELECT distinct c.id, c.name_code, c.age, c.gender, c.special_need FROM child c INNER JOIN child_properties cp on c.id = cp.child_id INNER JOIN properties p on cp.property_id = p.id INNER JOIN property_group pg on p.group = pg.id INNER JOIN sheet s on pg.sheet_id = s.id WHERE s.id = " + currentSheetID)

childData = list(cursor.fetchall())
childData = list(({"id": child_id, childHeaders[1]["name"]: name, childHeaders[2]["name"]: age, childHeaders[3]["name"]: gender, childHeaders[4]["name"]: special_need}) for (child_id, name, age, gender, special_need) in childData)

excludedProperties = []

rawPropertiesWithGroups = dataframe.items()
commentGroup = lookupGroupProperties(lastGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

commentDataIndex = lookupPropertyInGroup(commentProperty, "name", commentGroup)["index"]
childDataIndex = lookupPropertyInGroup(childNameProperty, "name", childHeaders)["index"]

excelCommentData = dataframe.iloc[1:, commentDataIndex:]
excelChildIndexes = dataframe.iloc[1:, [childHeaders[1]["index"], childHeaders[2]["index"], childHeaders[3]["index"], childHeaders[4]["index"]]]

commentData = []
for i in range(0, len(excelCommentData.iloc[0:])):

    comment = excelCommentData.iloc[0:, [0]].iloc[i, 0]
    excelChildNameCode = excelChildIndexes.iloc[0:, [0]].iloc[i, 0]

    childFirstHeader = str(excelChildIndexes.iloc[0:, [0]].iloc[i, 0])
    childSecondHeader = excelChildIndexes.iloc[0:, [1]].iloc[i, 0]
    childThirdHeader = excelChildIndexes.iloc[0:, [2]].iloc[i, 0]
    childFourthHeaderData = excelChildIndexes.iloc[0:, [3]].iloc[i, 0]
    child = next((item for item in childData if item[childHeaders[1]["name"]] == childFirstHeader
              and item[childHeaders[2]["name"]] == childSecondHeader
              and item[childHeaders[3]["name"]] == childThirdHeader
              and item[childHeaders[4]["name"]] == childFourthHeaderData), None)

    if child:
        childID = child["id"]
        commentData.append({"child_id": childID, "comment": comment})

sql = "INSERT INTO comment (child_id, comment) SELECT * FROM (SELECT (%(child_id)s), (%(comment)s)) AS tmp WHERE NOT EXISTS (SELECT child_id, comment FROM comment WHERE child_id = (%(child_id)s) AND comment = (%(comment)s)) LIMIT 1"
insertData(sql, commentData)