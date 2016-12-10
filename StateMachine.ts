///<reference path="StateMachineTypes.ts"/>
///<reference path="StateMachineHelper.ts"/>
//declare 

const constantKey = `const `;
const exportKey = 'export ';


//AddId
export const LineTypes = {
    AliasConstant:{} as Line,
    BodyComment:{
        conditionsToQualify:[
            {
                afterTrimming: LeftRightBoth.Left,
                mustStartWith: '*'
            }
        ]
    } as Line,
    ClosingComment:{
        conditionsToQualify:[
            {
                afterTrimming: LeftRightBoth.Right,
                mustEndWith: `*/`
            }
        ]
    } as Line,
    ClosingObjectConstant:{
        conditionsToQualify:[
            {
                afterTrimming: LeftRightBoth.Left,
                mustEndWith: '}',
                //actionIfTrue: 
            }
        ]
    } as Line,
    ClosingObjectPropertyValue:{} as Line,
    EmptyLine:{
        conditionsToQualify:[
            {
                afterTrimming: LeftRightBoth.Both,
                length: 0
            }
        ]
    } as Line,
    ObjectPropertyValue:{} as Line,
    OpenComment:{
        conditionsToQualify:[
            {
                afterTrimming: LeftRightBoth.Left,
                mustStartWith: `/*`
            }
        ]
    } as Line,
    OpenArrayExportConstant:{
        conditionsToQualify:[
            {
                afterTrimming: LeftRightBoth.Both,
                mustEndWith: '['
            },
            {
                mustStartWith: exportKey + constantKey
            }
        ]
    } as Line,
    OpenArrayLocalConstant:{
        conditionsToQualify:[
            {
                afterTrimming: LeftRightBoth.Both,
                mustEndWith: '['
            },
            {
                mustStartWith: constantKey
            }
        ]
    } as Line,
    OpenArrayPropertyValue:{} as Line,
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



