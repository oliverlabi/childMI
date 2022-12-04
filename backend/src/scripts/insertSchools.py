from config import *

excludedProperties = []

childData = []
schools = []

currentDataFrame = dataframe.index.drop_duplicates()

for school in currentDataFrame:
    if school == dataframe.index[0]:
        continue

    schools.append({"name": school})

sql = "INSERT INTO school (name) SELECT * FROM (SELECT (%(name)s)) AS tmp WHERE NOT EXISTS (SELECT name FROM school WHERE name = (%(name)s)) LIMIT 1"
insertData(sql, schools)