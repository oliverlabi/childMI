from globals import *

excludedProperties = []
childHeaders = lookupGroupProperties(parentGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

childData = []

firstHeader = childHeaders[0]["index"]

currentDataFrame = dataframe.iloc[1:, [firstHeader]].drop_duplicates()

for i in range(0, len(currentDataFrame.iloc[0:])):
    teacherCode = currentDataFrame.iloc[0:, [0]].iloc[i, 0]

    childData.append({"name_code": teacherCode})

sql = "INSERT INTO teacher (name_code) SELECT * FROM (SELECT %(name_code)s) AS tmp WHERE NOT EXISTS (SELECT name_code FROM teacher WHERE name_code = (%(name_code)s)) LIMIT 1"

insertData(sql, childData)