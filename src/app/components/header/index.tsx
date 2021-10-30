import * as Semantic from 'semantic-ui-react';
import * as Redux from '../../hooks';

export const Header = {
	Login: () => {
		const { name, version } = Redux.useAppSelector((state) => state.app);
		const { Header, Icon } = Semantic;
		const { Content, Subheader } = Header;

		return (
			<Header inverted as='h1' size='huge' textAlign='left'>
				<Icon color='blue' name='braille' />
				<Content>
					{name}
					<Subheader>{`version: ${version}`}</Subheader>
				</Content>
			</Header>
		);
	},
	Dashboard: () => {
		const { name, version } = Redux.useAppSelector((state) => state.app);
		const { Header, Icon } = Semantic;
		const { Content, Subheader } = Header;

		return (
			<Header inverted as='h1' size='huge' textAlign='left'>
				<Icon color='blue' name='braille' />
				<Content>
					{name}
					<Subheader>{`version: ${version}`}</Subheader>
				</Content>
			</Header>
		);
	},
	Add: () => {
		const { name, version } = Redux.useAppSelector((state) => state.app);
		const { Header, Icon } = Semantic;
		const { Content, Subheader } = Header;

		return (
			<Header inverted as='h1' size='huge' textAlign='left'>
				<Icon color='blue' name='braille' />
				<Content>
					{name}
					<Subheader>{`Add New Membership: ${version}`}</Subheader>
				</Content>
			</Header>
		);
	},
	Account: () => {
		const { name, version } = Redux.useAppSelector((state) => state.app);
		const { Header, Icon } = Semantic;
		const { Content, Subheader } = Header;

		return (
			<Header inverted as='h1' size='huge' textAlign='left'>
				<Icon color='blue' name='braille' />
				<Content>
					{name}
					<Subheader>{`version: ${version}`}</Subheader>
				</Content>
			</Header>
		);
	},
	Buy: () => {
		const { name, version } = Redux.useAppSelector((state) => state.app);
		const { Header, Icon } = Semantic;
		const { Content, Subheader } = Header;

		return (
			<Header
				inverted
				as='h1'
				size='huge'
				textAlign='left'
				style={{ marginLeft: '14px', marginTop: '10px' }}
			>
				<Icon color='blue' name='braille' />
				<Content>
					{name}
					<Subheader>{`version: ${version}`}</Subheader>
				</Content>
			</Header>
		);
	},
};
