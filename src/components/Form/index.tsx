import {isNotEmpty, useForm} from '@mantine/form';
import {NumberInput, TextInput, Button, Select, Checkbox, Paper, Group, Title, Stack} from '@mantine/core';
import {DatePickerInput} from "@mantine/dates";
import "./styles.css"
import {useMutation, useQuery} from "react-query";
import {getCities, IFormData, postForm} from "../../test/fakeApiCall.ts";


const DemoForm = (): JSX.Element => {
    const cities = useQuery('cities', getCities)

    const form = useForm<IFormData>({
        initialValues: {
            from: '',
            fromDate: new Date(),
            to: '',
            toDate: new Date(),
            passengers: 0,
            promotionCode: '',
            findLowestFare: false,
        },
        validate: {
            from: isNotEmpty('Please select a departure city'),
            // fromDate: (value) => value || 'Please select a departure date time',
            to: isNotEmpty('Please select a destination city'),
            // toDate: (value) => value || 'Please select a departure date time',
            passengers: (value) => {
                if (value < 1) {
                    return 'The passengers number must be greater than 0'
                }
            }
        },
    });

    const handlePostForm = () => {
        return useMutation({
            mutationKey: 'postForm',
            mutationFn: postForm,
            onSuccess: (data) => {
                console.log(data)
            }
        })
    }

    const { mutate } = handlePostForm()

    // const onSubmit = useMutation({
    //     mutationFn: postForm,
    //     onSuccess: (data) => {
    //         console.log(data)
    //     }
    // })

    return (
        <Paper withBorder radius={'xl'} p={'xl'} shadow={'xs'} maw={420}>
            <form onSubmit={form.onSubmit(mutate)}>
                <Stack>
                    <Title order={2}>Book a flight</Title>
                    <Group grow>
                        <Select
                            label="From"
                            placeholder="Pick one"
                            required={true}
                            data={cities?.data?.map((city) => ({value: city?.value, label: city?.label})) || []}
                            {...form.getInputProps('from')}
                        />
                        <DatePickerInput
                            {...form.getInputProps('fromDate')}
                            label="Departure date"
                            placeholder="Pick date"
                            value={form.values.fromDate}
                            onChange={(value) => {
                                form.setFieldValue('fromDate', value)
                            }}
                            mx="auto"
                            maw={400}
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
                            {...form.getInputProps('toDate')}
                            value={form.values.toDate}
                            minDate={form.values.fromDate || new Date()}
                            onChange={(value) => {
                                form.setFieldValue('toDate', value)
                            }}
                            mx="auto"
                            maw={400}
                        />
                    </Group>

                    <NumberInput
                        label="Number of passengers"
                        placeholder="Number of passengers"
                        required={true}
                        {...form.getInputProps('passengers')}
                    />


                    <TextInput label="Promotion Code"
                               placeholder="Promotion Code" {...form.getInputProps('name')} {...form.getInputProps('promotionCode')}/>
                    <Checkbox
                        label="Find lowest fare"
                    />

                    <Button sx={{width: "100%"}} type="submit">
                        Let's go
                    </Button>

                </Stack>
            </form>
        </Paper>
    );
}

export default DemoForm