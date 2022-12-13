from config import *

excludedProperties = []
childHeaders = lookupGroupProperties(childDataGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

childData = []

teacherDataIndex = lookupPropertyInGroup(teacherNameProperty, "name", childHeaders)["index"]

currentDataFrame = dataframe.iloc[1:, [teacherDataIndex]].drop_duplicates()

for i in range(0, len(currentDataFrame.iloc[0:])):
    teacherCode = currentDataFrame.iloc[0:, [0]].iloc[i, 0]

    teacherCode = teacherCode.split(' ', 1)

    childData.append({"first_name": teacherCode[0], "last_name": teacherCode[1]})

sql = "INSERT INTO teacher (first_name, last_name) SELECT * FROM (SELECT %(first_name)s, (%(last_name)s)) AS tmp WHERE NOT EXISTS (SELECT first_name, last_name FROM teacher WHERE first_name = (%(first_name)s) AND last_name = (%(last_name)s))"

insertData(sql, childData)