import {DateValue} from "@mantine/dates";

export const getCities = async () => {
    return Promise.resolve([
        { value: 'Hanoi', label: 'Hanoi' },
        { value: 'Ho Chi Minh City', label: 'Ho Chi Minh City' },
        { value: 'Tokyo', label: 'Tokyo' },
    ]);
}

export interface IFormData {
    from: string;
    fromDate: DateValue;
    to: string,
    toDate: DateValue,
    passengers: number,
    promotionCode: string,
    findLowestFare: boolean,
}

export const postForm = async (data: any) => {
    return Promise.resolve({
        message: 'Success',
        data: data,
    });
}