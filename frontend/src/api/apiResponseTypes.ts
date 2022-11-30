interface IAllChildrenDataBySheetResponse {
    child_name_code: string,
    property_group_name: string,
    property_id: number,
    child_property_value: string
}

interface IAllPropertiesBySheetResponse {
    id: number,
    name: string
}

interface IAllSchoolDataResponse {
    id: number,
    name: string
}

interface ISchoolTeachersByIdResponse {
    teacher_id: number,
    start_year: number,
    teacher_full_name: string,
    school_id: number,
    school_name: string
}

interface ISchoolChildrenByIdResponse {
    child_id: number,
    name_code: string,
    school_id: number
}

interface IAllTeacherDataResponse {
    id: number,
    full_name: string,
    start_year: number
}

interface IAllTeachersByYearResponse {
    id: number,
    full_name: string,
    start_year?: number
}

interface ITeacherDataResponse {
    id: number,
    full_name: string,
    start_year: number,
    school_id: number,
    school_name: string
}

interface ITeacherChildrenResponse {
    child_name: string,
    child_id: string
}

interface IAllTeacherYearsResponse {
    start_year: number
}