from config import *

childHeaders = lookupGroupProperties(childDataGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

teacherDataIndex = lookupPropertyInGroup(teacherNameProperty, "name", childHeaders)["index"]
childDataIndex = lookupPropertyInGroup(childNameProperty, "name", childHeaders)["index"]

cursor.execute("SELECT distinct c.id, c.name_code, c.age, c.gender, c.special_need FROM child c INNER JOIN child_properties cp on c.id = cp.child_id INNER JOIN properties p on cp.property_id = p.id INNER JOIN property_group pg on p.group = pg.id INNER JOIN sheet s on pg.sheet_id = s.id WHERE s.id = " + currentSheetID)

childData = list(cursor.fetchall())
childData = list(({"id": child_id, childHeaders[1]["name"]: name, childHeaders[2]["name"]: age, childHeaders[3]["name"]: gender, childHeaders[4]["name"]: special_need}) for (child_id, name, age, gender, special_need) in childData)

cursor.execute("SELECT distinct id, first_name, last_name, start_year FROM teacher WHERE start_year=" + currentSheetYear)

teacherData = list(cursor.fetchall())
teacherData = list(({"id": teacher_id, "first_name": first_name, "last_name": last_name, "start_year": start_year}) for (teacher_id, first_name, last_name, start_year) in teacherData)

excelChildTeacherData = dataframe.iloc[1:, [teacherDataIndex, childHeaders[1]["index"], childHeaders[2]["index"], childHeaders[3]["index"], childHeaders[4]["index"]]]

childTeacherData = []
for i in range(0, len(excelChildTeacherData.iloc[0:])):
    teacherName = excelChildTeacherData.iloc[0:, [0]].iloc[i, 0]
    teacherName = teacherName.split(" ", 1)
    teacherID = next(item for item in teacherData if item["first_name"] == teacherName[0] and item["last_name"] == teacherName[1])["id"]

    childFirstHeader = str(excelChildTeacherData.iloc[0:, [1]].iloc[i, 0])
    childSecondHeader = excelChildTeacherData.iloc[0:, [2]].iloc[i, 0]
    childThirdHeader = excelChildTeacherData.iloc[0:, [3]].iloc[i, 0]
    child = next((item for item in childData if item[childHeaders[1]["name"]] == childFirstHeader
                   and (item[childHeaders[2]["name"]] == childSecondHeader) and item[childHeaders[3]["name"]] == childThirdHeader), None)

    if child["name_code"] == 'Alisa':
        print("child")
    if child:
        childID = child["id"]
        childTeacherData.append({"teacher_id": teacherID, "child_id": childID})

sql = "INSERT INTO teacher_children (child_id, teacher_id) SELECT * FROM (SELECT (%(child_id)s) AS childID, (%(teacher_id)s) AS teacherID) AS tmp WHERE NOT EXISTS (SELECT child_id, teacher_id FROM teacher_children WHERE child_id = (%(child_id)s) AND teacher_id = (%(teacher_id)s)) LIMIT 1"

insertData(sql, childTeacherData)