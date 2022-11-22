export interface IChildPropertyResponse {
    child_name_code: string,
    property_group_name: string,
    property_name: string,
    child_property_value: string,
}

export interface ITeacherChildrenResponse {
    child_id: number,
    child_name: string,
}

export interface ISchoolResponse {
    id: number,
    name: string,
}

export interface ITeacherResponse {
    id: number,
    full_name: string,
    start_year: number
}