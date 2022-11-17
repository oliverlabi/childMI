from globals import *


def appendDataIfNotExist(languageArray, languageDict, columnName):
    for language in languageArray:
        if not any(d[columnName] == language for d in languageDict) and language != '':
            languageDict.append({columnName: language})


parentHeaders = lookupGroupProperties(parentDataGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

parentData = []

parentDataStartIndex = parentHeaders[0]["index"]
parentDataEndIndex = parentHeaders[len(parentHeaders) - 1]["index"] + 1

currentDataFrame = dataframe.iloc[1:, parentDataStartIndex:parentDataEndIndex]
languagesData = []

for i in range(0, len(currentDataFrame.iloc[0:])):
    firstColumnLanguages = currentDataFrame.iloc[0:, [0]].iloc[i, 0].split(', ')
    secondColumnLanguages = currentDataFrame.iloc[0:, [1]].iloc[i, 0].split(', ')
    thirdColumnLanguages = currentDataFrame.iloc[0:, [2]].iloc[i, 0].split(', ')
    fourthColumnLanguages = currentDataFrame.iloc[0:, [3]].iloc[i, 0].split(', ')
    fifthColumnLanguages = currentDataFrame.iloc[0:, [4]].iloc[i, 0].split(', ')
    sixthColumnLanguages = currentDataFrame.iloc[0:, [5]].iloc[i, 0].split(', ')

    appendDataIfNotExist(firstColumnLanguages, languagesData, "language_name")
    appendDataIfNotExist(secondColumnLanguages, languagesData, "language_name")
    appendDataIfNotExist(thirdColumnLanguages, languagesData, "language_name")
    appendDataIfNotExist(fourthColumnLanguages, languagesData, "language_name")
    appendDataIfNotExist(fifthColumnLanguages, languagesData, "language_name")
    appendDataIfNotExist(sixthColumnLanguages, languagesData, "language_name")

sql = "INSERT INTO language (language_name) SELECT * FROM (SELECT %(language_name)s) AS tmp WHERE NOT EXISTS (SELECT language_name FROM language WHERE language_name = (%(language_name)s)) LIMIT 1"

insertData(sql, languagesData)