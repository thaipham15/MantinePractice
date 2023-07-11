import {isNotEmpty, useForm} from '@mantine/form';
import {NumberInput, TextInput, Button, Box, Grid, Select, Checkbox} from '@mantine/core';
import {DatePickerInput} from "@mantine/dates";
import {useState} from "react";
import "./styles.css"
import {useQuery} from "react-query";
import {getCities} from "../../test/fakeApiCall.ts";


const DemoForm = (): JSX.Element => {
    const cities = useQuery('cities', getCities)
    const [fromDate, setFromDate] = useState<Date >();
    const [toDate, setToDate] = useState<Date | null>(null);

    const form = useForm({
        initialValues: {
            from: null,
            fromDate: null,
            to: null,
            toDate: null,
            passengers: 0,
            promotionCode: '',
            findLowestFare: false,
        },
        validate: {
            from: isNotEmpty('Please select a departure city'),
            fromDate: (value) => value || 'Please select a departure date time',
            to: isNotEmpty('Please select a destination city'),
            toDate: (value) => value || 'Please select a departure date time',
            passengers: (value) => value > 0 || 'Number of passengers must be greater than 0',
        },
    });

    return (
        <Box className="form-wrapper" maw={420} mx="auto">
            <h2>Book a flight</h2>
            <form onSubmit={form.onSubmit(console.log)}>
                <Grid>
                    <Grid.Col span={6}>
                        <Select
                            label="From"
                            placeholder="Pick one"
                            required={true}
                            data={cities?.data?.map((city) => ({value: city?.value, label: city?.label})) || []}
                            {...form.getInputProps('from')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <DatePickerInput
                            label="Departure date"
                            placeholder="Pick date"
                            value={fromDate}
                            onChange={setFromDate}
                            mx="auto"
                            maw={400}
                            {...form.getInputProps('fromDate')}
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={6}>
                        <Select
                            label="To"
                            required={true}
                            placeholder="Pick one"
                            data={[
                                { value: 'Hanoi', label: 'Hanoi' },
                                { value: 'Ho Chi Minh City', label: 'Ho Chi Minh City' },
                                { value: 'Tokyo', label: 'Tokyo' },
                            ]}
                            {...form.getInputProps('to')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <DatePickerInput
                            label="Return Date"
                            placeholder="Pick date"
                            value={toDate}
                            minDate={fromDate}
                            onChange={setToDate}
                            mx="auto"
                            maw={400}
                            {...form.getInputProps('toDate')}
                        />
                    </Grid.Col>
                </Grid>

                <NumberInput
                    mt={"sm"}
                    label="Number of passengers"
                    placeholder="Number of passengers"
                    required={true}
                    {...form.getInputProps('passengers')}
                />


                <TextInput mt={"sm"}  label="Promotion Code" placeholder="Promotion Code" {...form.getInputProps('name')} {...form.getInputProps('promotionCode')}/>

                <Checkbox
                    mt={"xl"}
                    label="Find lowest fare"
                />


                <Button sx={{width: "100%"}} type="submit" mt="sm">
                    Let's go
                </Button>
            </form>
        </Box>
    );
}

export default DemoForm