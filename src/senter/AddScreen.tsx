import * as React from 'react';
import * as Redux from '../app/hooks';
import * as ReactFinalForm from 'react-final-form';
import * as ReactRouter from 'react-router-dom';
import * as Semantic from 'semantic-ui-react';
import { Membership } from '../app/reducer/membershipSlice';
import { API } from '../app/service/api';
import { Normalize } from '../app/service/normalize';
import { getDate, getTime } from '../app/utilities/formHelper';
import type {
    ScreenPortalProps,
    AddScreenHeaderProps,
    AddScreenFormProps,
    AccountFieldProps,
    AddButtonProps,
    CancelButtonProps,
    PurchaseType,
} from './types';

const { Form, Field } = ReactFinalForm;
const {
    Header,
    TransitionablePortal,
    Segment,
    Grid,
    Icon,
    Form: { Input, Group, Button },
} = Semantic;

export const AddScreenComponent = {
    Portal: ({
        open = true,
        transition = { animation: 'fade', duration: 500 },
        children,
    }: ScreenPortalProps) => (
        <TransitionablePortal open={open} transition={transition}>
            <Segment className='Add'>
                <Grid>
                    <Grid.Column className='Add'>{children}</Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    ),
    Header: ({ name = '', version = '' }: AddScreenHeaderProps) => (
        <Header inverted as='h1' size='huge' textAlign='left'>
            <Icon color='blue' name='braille' />
            <Header.Content>
                {name}
                <Header.Subheader>
                    New Membership: version {version}
                </Header.Subheader>
            </Header.Content>
        </Header>
    ),
    Form: ({
        onSubmit,
        error,
        subscription,
        initialValues,
    }: AddScreenFormProps) => {
        const { push } = ReactRouter.useHistory();
        const {
            Date,
            Time,
            Note,
            Phone,
            Account,
            FirstName,
            LastName,
            Fee,
            Gallon,
            AddButton,
            CancelButton,
        } = AddScreenComponent;

        const handleCancelClick = () => push('/dashboard');

        return (
            <Form
                initialValuesEqual={() => true}
                subscription={subscription}
                initialValues={initialValues}
                onSubmit={onSubmit}
                render={({ handleSubmit, values, submitting }) => (
                    <Semantic.Form onSubmit={handleSubmit}>
                        <Group>
                            <Note />
                            <Date />
                            <Time />
                        </Group>
                        <Group>
                            <Account error={error} />
                            <Phone />
                            <FirstName />
                            <LastName />
                            <Fee />
                            <Gallon />
                            <AddButton
                                values={values}
                                submitting={submitting}
                            />
                            <CancelButton onClick={handleCancelClick} />
                        </Group>
                    </Semantic.Form>
                )}
            />
        );
    },
    Date: () => (
        <Field
            name='date'
            render={({ input }) => (
                <Input
                    fluid
                    id='date'
                    label='Date'
                    className='Name'
                    placeholder='mm/dd/yyyy'
                    size='massive'
                    inverted
                    readOnly
                    {...input}
                    width={2}
                />
            )}
        />
    ),
    Time: () => (
        <Field
            name='time'
            render={({ input }) => (
                <Input
                    id='time'
                    label='Time'
                    className='Name'
                    placeholder='xx:xx:xx'
                    {...input}
                    size='massive'
                    inverted
                    readOnly
                    width={2}
                />
            )}
        />
    ),
    Note: () => (
        <Field
            name='note'
            render={({ input }) => (
                <Input
                    label='Note'
                    id='note'
                    className='AddNote'
                    size='massive'
                    placeholder='Add Note'
                    {...input}
                    spellCheck='false'
                    inverted
                    width={15}
                />
            )}
        />
    ),
    Account: ({ error }: AccountFieldProps) => (
        <Field
            name='account'
            parse={Normalize.account}
            render={({ input }) => (
                <Input
                    id='account'
                    className='Name'
                    label='Account'
                    placeholder='xxxxxxx'
                    error={error ? error : false}
                    size='massive'
                    inverted
                    {...input}
                    width={3}
                />
            )}
        />
    ),
    Phone: () => (
        <Field
            name='phone'
            parse={Normalize.phone}
            render={({ input }) => (
                <Input
                    id='phone'
                    className='Name'
                    label='Phone Number'
                    placeholder='xxx-xxx-xxxx'
                    size='massive'
                    inverted
                    {...input}
                    width={2}
                />
            )}
        />
    ),
    FirstName: () => (
        <Field
            name='first'
            parse={Normalize.name}
            render={({ input }) => (
                <Input
                    id='firstName'
                    label='First Name'
                    className='Name'
                    spellCheck='false'
                    placeholder='First Name'
                    size='massive'
                    inverted
                    {...input}
                    width={3}
                />
            )}
        />
    ),
    LastName: () => (
        <Field
            name='last'
            parse={Normalize.name}
            render={({ input }) => (
                <Input
                    id='lastName'
                    label='Last Name'
                    className='Name'
                    placeholder='Last Name'
                    {...input}
                    spellCheck='false'
                    size='massive'
                    inverted
                    width={3}
                />
            )}
        />
    ),
    Fee: () => (
        <Field
            name='fee'
            parse={Normalize.fee}
            render={({ input }) => (
                <Input
                    id='fee'
                    className='TodayDate'
                    label='Fee'
                    {...input}
                    size='massive'
                    inverted
                    width={1}
                />
            )}
        />
    ),
    Gallon: () => {
        const { change } = ReactFinalForm.useForm();

        return (
            <Field
                name='gallon'
                parse={Normalize.gallon}
                render={({ input }) => (
                    <Input
                        id='gallon'
                        label='Gallon'
                        className='TodayDate'
                        name={input.name}
                        value={input.value}
                        size='massive'
                        inverted
                        onChange={(event, data) => {
                            event.preventDefault();
                            input.onChange(data.value);
                            change('remain', parseInt(data.value));
                        }}
                        width={1}
                    />
                )}
            />
        );
    },
    AddButton: ({ values, submitting }: AddButtonProps) => (
        <Button
            id='AddMember'
            content='Add'
            type='submit'
            size='massive'
            disabled={
                !values.phone ||
                values.phone.length < 14 ||
                !values.account ||
                !values.first ||
                !values.last ||
                !values.fee ||
                !values.gallon ||
                submitting
            }
            primary
            fluid
            width={2}
            circular
            style={{ marginTop: '30px' }}
        />
    ),
    CancelButton: ({ handleClick, onClick }: CancelButtonProps) => (
        <Button
            id='CancelAdd'
            content='Cancel'
            type='button'
            size='massive'
            secondary
            fluid
            circular
            style={{ marginTop: '30px' }}
            // onClick={handleClick}
            onClick={onClick}
        />
    ),
    AddScreen: () => {
        // Custom Semantic Component
        const { Header, Portal, Form } = AddScreenComponent;

        // Redux Store
        const { name, version } = Redux.useAppSelector((state) => state.app);

        // React Router State and Hooks
        const { push } = ReactRouter.useHistory();

        // React Form onSubmit handler
        const [error, setError] = React.useState<boolean | string>(false);
        const onSubmit = async (values: Membership) => {
            const response = await API.addMembership(values);
            const { duplicate, membership, account } = response;

            if (duplicate) {
                setError(`Account ${account} already existed`);
            } else {
                const history = await API.getHistory(account!);
                push({ pathname: '/purchase', state: { membership, history } });
            }
        };

        const subscription = {
            submitting: true,
            valid: true,
            values: true,
        };

        const initialValues = {
            account: undefined,
            phone: undefined,
            first: undefined,
            last: undefined,
            note: undefined,
            fee: 0,
            gallon: 0,
            buy: 0,
            remain: 0,
            previous: 0,
            type: 'NEW' as PurchaseType,
            since: getDate(),
            date: getDate(),
            time: getTime(),
        };

        React.useEffect(() => {
            document.getElementById('account')?.focus();
        }, []);

        return (
            <Portal>
                <Header name={name} version={version} />
                <Form
                    error={error}
                    onSubmit={onSubmit}
                    subscription={subscription}
                    initialValues={initialValues}
                />
            </Portal>
        );
    },
};

export const { AddScreen } = AddScreenComponent;
export default AddScreen;
