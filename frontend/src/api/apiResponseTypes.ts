export interface IAllChildrenDataBySheetResponse {
    id: number,
    age: number,
    gender: string,
    special_need: string
}

export interface IChildDataBySheetAndIdResponse {
    age: number,
    gender: string,
    special_need: number,
    teacher_id: number,
    teacher_full_name: string,
    school_name: string,
}

export interface IAllChildrenPropertiesDataBySheetResponse {
    child_id: number,
    property_group_name: string,
    property_id: number,
    child_property_value: string
}

export interface IAllPropertiesBySheetResponse {
    id: number,
    name: string
}

export interface IAllChildPropertiesBySheetIdAndChildIdResponse {
    property_group_name: string,
    property_id: number,
    child_property_value: string
}

export interface IAllSheetsDataResponse {
    id: number,
    year: number,
    season: number,
    type: number
}

export interface IAllCommentsBySheetIdResponse {
    child_id: number,
    comment: string,
}

export interface IAllSchoolDataResponse {
    id: number,
    name: string
}

export interface ISchoolTeachersByIdResponse {
    teacher_id: number,
    year: number,
    teacher_full_name: string,
    school_id: number,
    school_name: string
}

export interface ISchoolChildrenByIdResponse {
    child_id: number,
    school_id: number,
    sheet_id: number
}

export interface IChildrenTeachersAndSchoolsBySheetIdResponse {
    child_id: number,
    teacher_id: number,
    teacher_full_name: string,
    school_id: number,
    school_name: string,
    teacher_year: number
}

export interface ITeacherSchoolsByIdResponse {
    school_id: number,
    school_name: string
}

export interface IAllPropertiesByGroupsByChildIdResponse {
    id: number,
    property_group_name: string,
    property_name: string,
    property_value: string
}

export interface IAllTeacherDataResponse {
    id: number,
    full_name: string,
    year: number
}

export interface IAllTeachersByYearResponse {
    id: number,
    full_name: string,
    year?: number
}

export interface ITeacherDataResponse {
    id: number,
    full_name: string,
}

export interface ITeacherChildrenResponse {
    child_id: string,
    sheet_id: number,
    year: number,
    season: number
}

export interface IAllTeacherYearsResponse {
    year: number,
    season: number
}