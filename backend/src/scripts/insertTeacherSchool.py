from config import *

childHeaders = lookupGroupProperties(childDataGroupName, rawPropertiesWithGroups, propertyHeaders, excludedProperties)

if schoolNameProperty == 0:
    schoolDataIndex = lookupPropertyInGroup(schoolNameProperty, "name", childHeaders)["index"]
else:
    schoolDataIndex = 0

teacherDataIndex = lookupPropertyInGroup(teacherNameProperty, "name", childHeaders)["index"]

cursor.execute("SELECT id, name FROM school")

schoolData = list(cursor.fetchall())
schoolData = list(({"id": id, "name": name}) for (id, name) in schoolData)

cursor.execute("SELECT id, first_name, last_name FROM teacher")

teacherData = list(cursor.fetchall())
teacherData = list(({"id": teacher_id, "first_name": first_name, "last_name": last_name}) for (teacher_id, first_name, last_name) in teacherData)

excelSchoolTeacherData = dataframe.iloc[1:, 0:1]

schoolTeacherData = []

for i in range(0, len(excelSchoolTeacherData.iloc[0:])):
    teacherName = excelSchoolTeacherData.iloc[0:, [0]].iloc[i, 0]
    teacherName = teacherName.split(" ", 1)
    teacherID = next(item for item in teacherData if item["first_name"] == teacherName[0] and item["last_name"] == teacherName[1])["id"]
    schoolName = excelSchoolTeacherData.index[i]
    schoolID = lookupDictInList(str(schoolName), schoolData, "name")["id"]

    if {"teacher_id": teacherID, "school_id": schoolID} not in schoolTeacherData:
        schoolTeacherData.append({"teacher_id": teacherID, "school_id": schoolID})

sql = "INSERT INTO teacher_school (school_id, teacher_id) SELECT * FROM (SELECT (%(school_id)s) AS schoolID, (%(teacher_id)s) AS teacherID) AS tmp WHERE NOT EXISTS (SELECT school_id, teacher_id FROM teacher_school WHERE school_id = (%(school_id)s) AND teacher_id = (%(teacher_id)s)) LIMIT 1"

insertData(sql, schoolTeacherData)