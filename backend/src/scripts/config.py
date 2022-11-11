import pandas as pd
import mysql.connector

# -------------------------------------------------------------------------------

# Per file configurations

# Exclude groups to properly set data to properties and property_group
excludedGroups = ["Taustaandmed", "Kodune keelekeskkond"]
excludedProperties = ["Kommentaarid"]

commentPropertyName = "Kommentaarid"
commentGroupName = "Kirjutamine"
parentGroupName = "Taustaandmed"

# Excel file
fileName = "qv-2020-1.ods"

splitFileName = fileName.split("-")
currentSheetDataType = splitFileName[0]
currentSheetYear = splitFileName[1]
currentSheetID = splitFileName[2].split(".")[0]

dataframe = pd.read_excel("./data/" + fileName, index_col=0, header=2)
dataframe = dataframe.where(dataframe.notna(), None)

# -------------------------------------------------------------------------------

# Database connection
childMI = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="childMI"
)

cursor = childMI.cursor()