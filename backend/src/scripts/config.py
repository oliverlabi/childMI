import pandas as pd
import mysql.connector

# -------------------------------------------------------------------------------

# Excel file
fileName = "qv-2020-0.ods"

splitFileName = fileName.split("-")
currentSheetDataType = splitFileName[0]
currentSheetYear = splitFileName[1]
currentSheetSeason = splitFileName[2].split(".")[0]
currentSheetURL = "https://drive.google.com/drive/u/1/folders/1-DNyesUvEzLJZSrEFVuri1R9hDMdnzOi"
currentSheetID = "2"
currentSheetHeaderIndex = 2

if currentSheetDataType == "qv":
    currentSheetDataType = 0
if currentSheetDataType == "ql":
    currentSheetDataType = 1

dataframe = pd.read_excel("./data/" + fileName, index_col=0, header=currentSheetHeaderIndex, keep_default_na=False)
dataframe = dataframe.where(dataframe.notna(), None)

# -------------------------------------------------------------------------------

# Database connection
childMI = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="childMI",
    use_unicode=True,
    charset="utf8mb4"
)

cursor = childMI.cursor()

# -------------------------------------------------------------------------------

# Global variables

rawPropertiesWithGroups = dataframe.items()

rawPropertyGroups = dataframe.columns
allPropertyGroups = []  # capitalized rawPropertyGroup values without unnamed data headers

propertyHeaders = dataframe.iloc[0].values

writingGroupName = "Kirjutamine"
childDataGroupName = "Taustaandmed"
parentDataGroupName = "Kodune keelekeskkond"
childNameProperty = "Lapse kood"
childAgeProperty = "Lapse vanus"
childGenderProperty = "Lapse sugu"
commentProperty = "Kommentaarid"
teacherNameProperty = "Õpetaja kood"
schoolNameProperty = "Kool"

# Exclude groups to properly set data to properties and property_group

excludedGroups = [childDataGroupName, parentDataGroupName]
excludedProperties = [commentProperty]

for group in rawPropertyGroups:
    if "Unnamed" not in group:
        allPropertyGroups.append(group.capitalize())


# -------------------------------------------------------------------------------

# Global functions


def insertData(sql, variables):
    cursor.executemany(sql, variables)
    childMI.commit()
    print(cursor.rowcount, "was inserted.")
    cursor.close()


def lookupDictInList(lookupValue, listData, itemName):
    return next(item for item in listData if item[itemName] == lookupValue)


def lookupPropertyInGroup(lookupValue, itemName, list):
    for value in list:
        if value[itemName] == lookupValue:
            return value


def lookupGroupProperties(lookupValue, propertiesWithGroups, headers, excludedProps):
    properties = []
    lastValidHeader = None

    i = 0
    for key, value in propertiesWithGroups:
        key = key.capitalize()
        if not "Unnamed" in key:
            lastValidHeader = key

        if headers[i] in excludedProps:
            i += 1
            continue

        if lastValidHeader != lookupValue:
            i += 1
            continue

        properties.append({"index": i, "name": headers[i]})

        if lastValidHeader != lookupValue:
            break

        i += 1

    return properties
