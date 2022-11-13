from config import *

# Global variables

rawPropertiesWithGroups = dataframe.items()

rawPropertyGroups = dataframe.columns
allPropertyGroups = []  # capitalized rawPropertyGroup values without unnamed data

propertyHeaders = dataframe.iloc[0].values

for group in rawPropertyGroups:
    if not "Unnamed" in group:
        allPropertyGroups.append(group.capitalize())


# Global functions

def insertData(sql, variables):
    cursor.executemany(sql, variables)
    childMI.commit()
    print(cursor.rowcount, "was inserted.")
    cursor.close()


def lookupIndex(lookupValue, dictionary):
    for key, value in dictionary.items():
        if value == lookupValue:
            return key


def lookupDictInList(lookupValue, listData, itemName):
    return next(item for item in listData if item[itemName] == lookupValue)


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
