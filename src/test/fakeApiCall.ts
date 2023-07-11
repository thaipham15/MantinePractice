export const getCities = async () => {
    return Promise.resolve([
        { value: 'Hanoi', label: 'Hanoi' },
        { value: 'Ho Chi Minh City', label: 'Ho Chi Minh City' },
        { value: 'Tokyo', label: 'Tokyo' },
    ]);
}