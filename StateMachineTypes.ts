interface Line{
    previousLine?: Line,
    conditionsToQualify?: Condition[],
    id?: String,
    openCharSequence?: openChar[],
    lineNumber?: number,
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
    lineTest?: (line: Line) => boolean;
    actionIfTrue?: (line: Line) => void;
}

interface NextLineRule{
    PreviousLineType: Line,
    PossibleLineTypes: Line[],
}