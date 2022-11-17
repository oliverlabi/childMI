from globals import *

cursor.execute("SELECT id, name_code FROM child")

childData = list(cursor.fetchall())
childData = list(({"id": child_id, "name_code": name_code}) for (child_id, name_code) in childData)

cursor.execute("SELECT id, language_name FROM language")

languagesData = list(cursor.fetchall())
languagesData = list(({"id": language_id, "language_name": language}) for (language_id, language) in languagesData)

childLanguages = []
childLanguageHeaders = lookupGroupProperties(parentDataGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)
childLanguageDataIndex = lookupPropertyInGroup(childLanguageProperty, "name", childLanguageHeaders)["index"]
childLanguageExposureDataIndex = lookupPropertyInGroup(childLanguageExposureProperty, "name", childLanguageHeaders)["index"]
excelChildNamePropertyIndex = list(propertyHeaders).index(childNameProperty)

excelChildLanguageData = dataframe.iloc[1:, [excelChildNamePropertyIndex, childLanguageDataIndex, childLanguageExposureDataIndex]].values

for data in excelChildLanguageData:
    dbChildID = lookupDictInList(str(data[0]), childData, "name_code")["id"]

    languageArray = data[1].split(", ")
    languageExposureArray = data[2].split(", ")

    if data[1] != '':
        for language in languageArray:
            dbLanguageID = lookupDictInList(language, languagesData, "language_name")["id"]
            childLanguages.append({"child_id": dbChildID, "language_id": dbLanguageID, "primary": 1})

    if data[2] != '':
        for language in languageExposureArray:
            dbLanguageID = lookupDictInList(language, languagesData, "language_name")["id"]
            childLanguages.append({"child_id": dbChildID, "language_id": dbLanguageID, "primary": 0})

sql = "INSERT INTO child_language (child_id, language_id, `primary`) SELECT * FROM (SELECT (%(child_id)s) as childID, (%(language_id)s) as languageID, (%(primary)s)) AS tmp WHERE NOT EXISTS (SELECT child_id, language_id, `primary` FROM child_language WHERE child_id = (%(child_id)s) AND language_id = (%(language_id)s) AND `primary` = (%(primary)s)) LIMIT 1"
insertData(sql, childLanguages)