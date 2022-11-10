from config import *

# Global variables

rawPropertiesWithGroups = dataframe.items()

rawPropertyGroups = dataframe.columns
allPropertyGroups = [] # capitalized rawPropertyGroup values without unnamed data

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
      if(value == lookupValue):
          return key

def lookupGroupProperties(lookupValue, rawPropertiesWithGroups, propertyHeaders):
  properties = []
  currentGroup = None
  i = 0
  for group, value in rawPropertiesWithGroups:
      group = group.capitalize()
      if group == lookupValue or currentGroup == lookupValue:
        properties.append({"name": propertyHeaders[i]})
        if not "Unnamed" in group:
          currentGroup = group
          if lookupValue != group:
            break
      i += 1
  
  return properties