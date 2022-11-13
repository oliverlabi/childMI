from globals import *

cursor.execute("SELECT id, name_code FROM child")

childData = list(cursor.fetchall())
childData = list(({"id": child_id, "name_code": name}) for (child_id, name) in childData)

cursor.execute("SELECT id, name_code FROM teacher")

teacherData = list(cursor.fetchall())
teacherData = list(({"id": teacher_id, "name_code": name}) for (teacher_id, name) in teacherData)

excelChildTeacherData = dataframe.iloc[1:, 0:2]

childTeacherData = []

for i in range(0, len(excelChildTeacherData.iloc[0:])):
    teacherNameCode = excelChildTeacherData.iloc[0:, [0]].iloc[i, 0]
    teacherID = lookupDictInList(teacherNameCode, teacherData, "name_code")["id"]

    childNameCode = excelChildTeacherData.iloc[0:, [1]].iloc[i, 0]
    childID = lookupDictInList(str(childNameCode), childData, "name_code")["id"]

    childTeacherData.append({"teacher_id": teacherID, "child_id": childID})

sql = "INSERT INTO teacher_children (child_id, teacher_id) SELECT * FROM (SELECT (%(child_id)s) AS childID, (%(teacher_id)s) AS teacherID) AS tmp WHERE NOT EXISTS (SELECT child_id, teacher_id FROM teacher_children WHERE child_id = (%(child_id)s) AND teacher_id = (%(teacher_id)s)) LIMIT 1"

insertData(sql, childTeacherData)