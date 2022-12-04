from config import *

cursor.execute("SELECT c.id, c.name_code FROM child c JOIN child_properties cp on c.id = cp.child_id JOIN properties p on cp.property_id = p.id JOIN property_group pg on p.group = pg.id RIGHT JOIN sheet s on pg.sheet_id = s.id WHERE s.id = " + currentSheetID + " GROUP BY c.id, c.name_code")

childData = list(cursor.fetchall())
childData = list(({"id": child_id, "name_code": name}) for (child_id, name) in childData)

excludedProperties = []

childHeaders = lookupGroupProperties(childDataGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)
rawPropertiesWithGroups = dataframe.items()
commentGroup = lookupGroupProperties(writingGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

commentDataIndex = lookupPropertyInGroup(commentProperty, "name", commentGroup)["index"]
childDataIndex = lookupPropertyInGroup(childNameProperty, "name", childHeaders)["index"]

excelCommentData = dataframe.iloc[1:, commentDataIndex:]
excelChildIndexes = dataframe.iloc[1:, childDataIndex:childDataIndex + 1]

commentData = []

for i in range(0, len(excelCommentData.iloc[0:])):

    comment = excelCommentData.iloc[0:, [0]].iloc[i, 0]
    excelChildNameCode = excelChildIndexes.iloc[0:, [0]].iloc[i, 0]

    childID = lookupDictInList(str(excelChildNameCode), childData, "name_code")["id"]

    if comment != '':
        commentData.append({"child_id": childID, "comment": comment})

sql = "INSERT INTO comment (child_id, comment) SELECT * FROM (SELECT (%(child_id)s), (%(comment)s)) AS tmp WHERE NOT EXISTS (SELECT child_id, comment FROM comment WHERE child_id = (%(child_id)s) AND comment = (%(comment)s)) LIMIT 1"
insertData(sql, commentData)