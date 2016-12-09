///<reference path="StateMachineTypes.ts"/>
export const LineTypes = {
    AliasConstant:{},
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
    ClosingObjectConstant:{},
    ClosingObjectPropertyValue:{},
    EmptyLine:{
        ConditionsToQualify:[
            {
                afterTrimming: LeftRightBoth.Both,
                length: 0
            }
        ]
    } as Line,
    ObjectPropertyValue:{},
    OpenComment:{
        trimLeft: true,
        startsWith: '/*'
    } as Line,
    OpenObjectConstant:{},
    OpenObjectPropertyValue:{},
    PrimitiveConstant:{},
    PrimitivePropertyValue:{},
    AllowedLineSequences: null,
}

const lt = LineTypes;
const openStatements = [lt.EmptyLine, lt.OpenComment, lt.OpenObjectConstant, lt.PrimitiveConstant];
const objectLiteralLines = [lt.PrimitivePropertyValue, lt.OpenObjectPropertyValue, lt.ClosingComment]

LineTypes.AllowedLineSequences = [
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



