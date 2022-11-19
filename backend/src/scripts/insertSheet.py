from globals import *

sql = "INSERT INTO sheet (year, url) SELECT * FROM (SELECT %(year)s, (%(url)s)) AS tmp WHERE NOT EXISTS (SELECT year, url FROM sheet WHERE year = (%(year)s) AND url = (%(url)s)) LIMIT 1"

insertData(sql, [{"year": currentSheetYear, "url": currentSheetURL}])