///<reference path="StateMachineTypes.ts"/>

//AddId
export const LineTypes = {
    AliasConstant:{} as Line,
    BodyComment:{
        ConditionsToQualify:[
            {
                afterTrimming: LeftRightBoth.Left,
                mustStartWith: '*'
            }
        ]
    } as Line,
    ClosingComment:{
        ConditionsToQualify:[
            {
                afterTrimming: LeftRightBoth.Right,
                mustEndWith: '*/'
            }
        ]
    } as Line,
    ClosingObjectConstant:{} as Line,
    ClosingObjectPropertyValue:{} as Line,
    EmptyLine:{
        ConditionsToQualify:[
            {
                afterTrimming: LeftRightBoth.Both,
                length: 0
            }
        ]
    } as Line,
    ObjectPropertyValue:{} as Line,
    OpenComment:{
        trimLeft: true,
        startsWith: '/*'
    } as Line,
    OpenObjectConstant:{} as Line,
    OpenObjectPropertyValue:{} as Line,
    PrimitiveConstant:{} as Line,
    PrimitivePropertyValue:{} as Line,
    AllowedNextLineRules: [] as NextLineRule[],
}

const lt = LineTypes;
const openStatements = [lt.EmptyLine, lt.OpenComment, lt.OpenObjectConstant, lt.PrimitiveConstant];
const objectLiteralLines = [lt.PrimitivePropertyValue, lt.OpenObjectPropertyValue, lt.ClosingComment]

LineTypes.AllowedNextLineRules = [
    {
        PreviousLineType: null,
        PossibleLineTypes: openStatements,
    },
    {
        PreviousLineType: lt.OpenComment,
        PossibleLineTypes: [
            lt.ClosingComment,
            lt.BodyComment,
        ]
    },
    {
        PreviousLineType: lt.BodyComment,
        PossibleLineTypes: [
            lt.ClosingComment,
            lt.BodyComment
        ]
    },
    {
        PreviousLineType: lt.ClosingComment,
        PossibleLineTypes: openStatements,
    },
    {
        PreviousLineType: lt.OpenObjectConstant,
        PossibleLineTypes:[
            lt.PrimitivePropertyValue, 
            lt.OpenObjectPropertyValue, 
            lt.ClosingObjectConstant
        ]
    }
]



