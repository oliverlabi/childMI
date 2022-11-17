from config import *

# Global variables

rawPropertiesWithGroups = dataframe.items()

rawPropertyGroups = dataframe.columns
allPropertyGroups = []  # capitalized rawPropertyGroup values without unnamed data

propertyHeaders = dataframe.iloc[0].values

# Exclude groups to properly set data to properties and property_group


writingGroupName = "Kirjutamine"
childDataGroupName = "Taustaandmed"
parentDataGroupName = "Kodune keelekeskkond"
childNameProperty = "Lapse kood"
commentProperty = "Kommentaarid"
teacherNameProperty = "Õpetaja kood"
childLanguageProperty = "Mis keelt laps ise kodus räägib?"
childLanguageExposureProperty = "Mis keeltega on lapsel veel kokkupuuteid?"
schoolNameProperty = "Kool"

excludedGroups = [childDataGroupName, parentDataGroupName]
excludedProperties = [commentProperty]

for group in rawPropertyGroups:
    if not "Unnamed" in group:
        allPropertyGroups.append(group.capitalize())


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
