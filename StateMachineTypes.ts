interface Line{
    PreviousLine?: Line;
    ConditionsToQualify?: Condition[]
}

type openChar = '{' | '[';

enum LeftRightBoth {
    Left,
    Right,
    Both
}

interface Condition{
    afterTrimming?: LeftRightBoth,
    mustEndWith?: string,
    mustStartWith?: string,
    length?: number,
}