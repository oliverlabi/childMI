from globals import *

cursor.execute("SELECT id, name_code FROM child")

childData = list(cursor.fetchall())
childData = list(({"id": child_id, "name_code": name}) for (child_id, name) in childData)

excelCommentData = dataframe.iloc[1:, -1:]
excelChildIndexes = dataframe.iloc[1:, 1:2]

commentData = []

for i in range(0, len(excelCommentData.iloc[0:])):

    comment = excelCommentData.iloc[0:, [0]].iloc[i, 0]
    excelChildNameCode = excelChildIndexes.iloc[0:, [0]].iloc[i, 0]

    childID = lookupDictInList(str(excelChildNameCode), childData, "name_code")["id"]

    if comment != '':
        commentData.append({"child_id": childID, "comment": comment})

sql = "INSERT INTO comment (child_id, comment) SELECT * FROM (SELECT (%(child_id)s), (%(comment)s)) AS tmp WHERE NOT EXISTS (SELECT child_id, comment FROM comment WHERE child_id = (%(child_id)s) AND comment = (%(comment)s)) LIMIT 1"
insertData(sql, commentData)