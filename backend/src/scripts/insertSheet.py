from config import *

sql = "INSERT INTO sheet (year, season, type, url, starting_years) SELECT * FROM (SELECT %(year)s as year, %(season)s as season, %(type)s as type, (%(url)s) as url, (%(starting_years)s) as starting_years) AS tmp WHERE NOT EXISTS (SELECT year, season, type, url, starting_years FROM sheet WHERE year = (%(year)s) AND season = (%(season)s) AND type = (%(type)s) AND url = (%(url)s) AND starting_years = (%(starting_years)s)) LIMIT 1"

insertData(sql, [{"year": currentSheetYear, "season": currentSheetSeason, "type": currentSheetDataType, "url": currentSheetURL, "starting_years": currentSheetStartingYears}])