import pandas as pd
import mysql.connector

# -------------------------------------------------------------------------------

# Excel file
fileName = "qv-2020-1.ods"

splitFileName = fileName.split("-")
currentSheetDataType = splitFileName[0]
currentSheetYear = splitFileName[1]
currentSheetID = splitFileName[2].split(".")[0]

dataframe = pd.read_excel("./data/" + fileName, index_col=0, header=2, keep_default_na=False)
dataframe = dataframe.where(dataframe.notna(), None)

# -------------------------------------------------------------------------------

# Database connection
childMI = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="childMI",
  use_unicode=True,
  charset="utf8mb4"
)

cursor = childMI.cursor()