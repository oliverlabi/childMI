from globals import *

sql = "INSERT INTO sheet (year, season, type, url) SELECT * FROM (SELECT %(year)s as year, %(season)s as season, %(type)s as type, (%(url)s) as url) AS tmp WHERE NOT EXISTS (SELECT year, season, type, url FROM sheet WHERE year = (%(year)s) AND season = (%(season)s) AND type = (%(type)s) AND url = (%(url)s)) LIMIT 1"

insertData(sql, [{"year": currentSheetYear, "season": currentSheetSeason, "type": currentSheetDataType, "url": currentSheetURL}])