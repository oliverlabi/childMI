from globals import *

childHeaders = lookupGroupProperties(childDataGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

teacherDataIndex = lookupPropertyInGroup(teacherNameProperty, "name", childHeaders)["index"]
childDataIndex = lookupPropertyInGroup(childNameProperty, "name", childHeaders)["index"]

cursor.execute("SELECT c.id, c.name_code FROM child c JOIN child_properties cp on c.id = cp.child_id JOIN properties p on cp.property_id = p.id JOIN property_group pg on p.group = pg.id RIGHT JOIN sheet s on pg.sheet_id = s.id WHERE s.id = " + currentSheetID + " GROUP BY c.id, c.name_code")

childData = list(cursor.fetchall())
childData = list(({"id": child_id, "name_code": name}) for (child_id, name) in childData)

cursor.execute("SELECT id, first_name, last_name FROM teacher")

teacherData = list(cursor.fetchall())
teacherData = list(({"id": teacher_id, "first_name": first_name, "last_name": last_name}) for (teacher_id, first_name, last_name) in teacherData)

excelChildTeacherData = dataframe.iloc[1:, [teacherDataIndex, childDataIndex]]

childTeacherData = []

for i in range(0, len(excelChildTeacherData.iloc[0:])):
    teacherName = excelChildTeacherData.iloc[0:, [0]].iloc[i, 0]
    teacherName = teacherName.split(" ", 1)
    teacherID = next(item for item in teacherData if item["first_name"] == teacherName[0] and item["last_name"] == teacherName[1])["id"]

    childNameCode = excelChildTeacherData.iloc[0:, [1]].iloc[i, 0]
    childID = lookupDictInList(str(childNameCode), childData, "name_code")["id"]

    childTeacherData.append({"teacher_id": teacherID, "child_id": childID})

sql = "INSERT INTO teacher_children (child_id, teacher_id) SELECT * FROM (SELECT (%(child_id)s) AS childID, (%(teacher_id)s) AS teacherID) AS tmp WHERE NOT EXISTS (SELECT child_id, teacher_id FROM teacher_children WHERE child_id = (%(child_id)s) AND teacher_id = (%(teacher_id)s)) LIMIT 1"

insertData(sql, childTeacherData)