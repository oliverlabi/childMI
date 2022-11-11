from globals import *

excludedProperties = []
writingHeaders = lookupGroupProperties(commentGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

comments = []
headers = []

commentDictValue = lookupDictInList(commentPropertyName, writingHeaders, "name")

currentDataFrame = dataframe.iloc[1:, [commentDictValue["index"]]]

for i in range(0, len(currentDataFrame.iloc[0:])):
    comment = currentDataFrame.iloc[0:, [0]].iloc[i, 0]

    if comment is None:
        continue

    comments.append({"child_id": i, "comment": comment})

sql = "INSERT INTO comment (child_id, comment) SELECT * FROM (SELECT (%(child_id)s), %(comment)s) AS tmp WHERE NOT EXISTS (SELECT child_id, comment FROM comment WHERE child_id = (%(child_id)s) AND comment = (%(comment)s)) LIMIT 1"

print(comments)

insertData(sql, comments)
