"""
from globals import *

parentHeaders = lookupGroupProperties(parentDataGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

parentData = []

parentDataStartIndex = parentHeaders[0]["index"]
parentDataEndIndex = parentHeaders[len(parentHeaders) - 1]["index"]

currentDataFrame = dataframe.iloc[1:, parentDataStartIndex:parentDataEndIndex]

print(currentDataFrame)

for i in range(0, len(currentDataFrame.iloc[0:])):
    gender = ""
    biological = 1

    parentOneData = currentDataFrame.iloc[0:, [0]].iloc[i, 0]
    parentTwoData = currentDataFrame.iloc[0:, [1]].iloc[i, 0]

    personOneData = currentDataFrame.iloc[0:, [2]].iloc[i, 0]
    personTwoData = currentDataFrame.iloc[0:, [3]].iloc[i, 0]

    if parentOneData is None:
        biological = 0



    print(motherData, fatherData, personOneData, personTwoData)

    #childData.append({"first_name": teacherCode[0], "last_name": teacherCode[1], "start_year": currentSheetYear})

#sql = "INSERT INTO teacher (first_name, last_name, start_year) SELECT * FROM (SELECT %(first_name)s, (%(last_name)s), (%(start_year)s)) AS tmp WHERE NOT EXISTS (SELECT first_name, last_name FROM teacher WHERE first_name = (%(first_name)s) AND last_name = (%(last_name)s) AND start_year = (%(start_year)s)) LIMIT 1"

"""