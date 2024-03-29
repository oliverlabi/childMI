from config import *

excludedProperties = []
childHeaders = lookupGroupProperties(childDataGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

childData = []

teacherDataIndex = lookupPropertyInGroup(teacherNameProperty, "name", childHeaders)["index"]

firstHeader = childHeaders[0]["index"]
childHeadersLength = len(childHeaders) + 1

currentDataFrame = dataframe.iloc[1:, teacherDataIndex:childHeadersLength]

for i in range(0, len(currentDataFrame.iloc[0:])):
    teacherCode = currentDataFrame.iloc[0:, [0]].iloc[i, 0]
    teacherCode = teacherCode.split(' ', 1)

    nameCode = currentDataFrame.iloc[0:, [1]].iloc[i, 0]
    if nameCode is None:
        nameCode = childNamePropertyEmpty

    age = currentDataFrame.iloc[0:, [2]].iloc[i, 0]
    if age == '':
        age = childAgePropertyEmpty

    gender = currentDataFrame.iloc[0:, [3]].iloc[i, 0]
    if gender == '':
        gender = childGenderPropertyEmpty

    special_need = currentDataFrame.iloc[0:, [4]].iloc[i, 0]

    childData.append({"first_name": teacherCode[0], "last_name": teacherCode[1], "c_name_code": str(nameCode), "age": age, "gender": str(gender), "special_need": special_need})

sql = "INSERT INTO child (name_code, age, gender, special_need) SELECT * FROM (SELECT %(c_name_code)s as nameCode, %(age)s as age, %(gender)s as gender, %(special_need)s as specialNeed) AS tmp WHERE NOT EXISTS (SELECT t.first_name, t.last_name, c.name_code, c.age, c.gender, c.special_need FROM child c, teacher t WHERE t.first_name = (%(first_name)s) AND t.last_name = (%(last_name)s) AND c.name_code = (%(c_name_code)s) AND c.age = (%(age)s) AND gender = (%(gender)s) AND special_need = (%(special_need)s)) LIMIT 1"

insertData(sql, childData)
