export const getCities = async () => {
    return Promise.resolve([
        { value: 'Hanoi', label: 'Hanoi' },
        { value: 'Ho Chi Minh City', label: 'Ho Chi Minh City' },
        { value: 'Tokyo', label: 'Tokyo' },
    ]);
}

// interface IFormData {
//     from: string;
//     fromDate: Date;
//     to: string,
//     toDate: Date,
//     passengers: Number,
//     promotionCode: string,
//     findLowestFare: boolean,
// }

export const postForm = async (data: any) => {
    return Promise.resolve({
        message: 'Success',
        data: data,
    });
}