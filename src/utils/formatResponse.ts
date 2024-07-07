type TBackendResponse<T> = {
    data: T;
    message?: string;
    statusCode: number;
}
export const formatResponse = <T>({ data, statusCode, message }: TBackendResponse<T>) => {
    return {
        statusCode,
        message,
        data,
    }
}