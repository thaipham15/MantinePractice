import {isNotEmpty, useForm} from '@mantine/form';
import {NumberInput, TextInput, Button, Select, Checkbox, Paper, Group} from '@mantine/core';
import {DatePickerInput} from "@mantine/dates";
import "./styles.css"
import {useMutation, useQuery} from "react-query";
import {getCities, postForm} from "../../test/fakeApiCall.ts";


const DemoForm = (): JSX.Element => {
    const cities = useQuery('cities', getCities)

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
    const onSubmit = useMutation(postForm, {
        onSuccess: (res) => {
            // Invalidate and refetch
            console.log(res)
        },
    })

    return (
        <Paper className="form-wrapper" maw={420}>
            <h2>Book a flight</h2>
            <form onSubmit={form.onSubmit(onSubmit.mutate)}>
                <Group grow>
                    <Select
                        label="From"
                        placeholder="Pick one"
                        required={true}
                        data={cities?.data?.map((city) => ({value: city?.value, label: city?.label})) || []}
                        {...form.getInputProps('from')}
                    />
                    <DatePickerInput
                        label="Departure date"
                        placeholder="Pick date"
                        value={form.values.fromDate}
                        onChange={form.setFieldValue('fromDate')}
                        mx="auto"
                        maw={400}
                        {...form.getInputProps('fromDate')}
                    />
                </Group>

                <Group grow>
                    <Select
                        label="To"
                        required={true}
                        placeholder="Pick one"
                        data={[
                            {value: 'Hanoi', label: 'Hanoi'},
                            {value: 'Ho Chi Minh City', label: 'Ho Chi Minh City'},
                            {value: 'Tokyo', label: 'Tokyo'},
                        ]}
                        {...form.getInputProps('to')}
                    />
                    <DatePickerInput
                        label="Return Date"
                        placeholder="Pick date"
                        value={form.values.toDate}
                        minDate={form.values.fromDate}
                        onChange={form.setFieldValue('toDate')}
                        mx="auto"
                        maw={400}
                        {...form.getInputProps('toDate')}
                    />
                </Group>

                <NumberInput
                    mt={"sm"}
                    label="Number of passengers"
                    placeholder="Number of passengers"
                    required={true}
                    {...form.getInputProps('passengers')}
                />


                <TextInput mt={"sm"} label="Promotion Code"
                           placeholder="Promotion Code" {...form.getInputProps('name')} {...form.getInputProps('promotionCode')}/>

                <Checkbox
                    mt={"xl"}
                    label="Find lowest fare"
                />


                <Button sx={{width: "100%"}} type="submit" mt="sm">
                    Let's go
                </Button>
            </form>
        </Paper>
    );
}

export default DemoForm