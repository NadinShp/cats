export const filterSearchParams = (searchParams: URLSearchParams, filterOut: string) => {
    const params = Array.from(searchParams.entries());
    const paramsObject = params.reduce<Record<string, string>>((acc, value) => {
        if (value[0] === filterOut) {
            return acc;
        } else {
            acc[value[0]] = value[1];
        }
        return acc;
    }, {});
    return paramsObject;
};