interface Line{
    PreviousLine?: Line,
    ConditionsToQualify?: Condition[],
    id?: String,
}

interface StatementLine{
    OpenCharSequence: openChar[];
}

type openChar = '{' | '[';

enum LeftRightBoth {
    Left,
    Right,
    Both,
}

interface Condition{
    afterTrimming?: LeftRightBoth,
    mustEndWith?: string,
    mustStartWith?: string,
    length?: number,
}

interface NextLineRule{
    PreviousLineType: Line,
    PossibleLineTypes: Line[],
}