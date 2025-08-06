export interface TextValueDto {
    Text: string;
    Value: string;
    Value_Num: number;
}

export function getTextValueInstance(): TextValueDto {
    return {
        Text: "",
        Value: "",
        Value_Num: 0,
    }
}