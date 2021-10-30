import * as React from 'react';
import * as Semantic from 'semantic-ui-react';
import {
	SemanticTRANSITIONS,
	TransitionPropDuration,
	SemanticVERTICALALIGNMENTS,
} from 'semantic-ui-react';
import * as Redux from '../app/hooks';

interface SenterHeaderProps {
	screen?: string;
}
interface SenterPortalProps {
	open: boolean;
	transition: {
		animation: SemanticTRANSITIONS;
		duration: number | string | TransitionPropDuration;
	};
	children: React.ReactNode;
	segmentClass: string;
	columnClass: string;
	verticalAlign: SemanticVERTICALALIGNMENTS;
}

export const Component = {
	Header: ({ screen = '' }: SenterHeaderProps) => {
		const { name, version } = Redux.useAppSelector((state) => state.app);
		const { Header, Icon } = Semantic;
		const { Content, Subheader } = Header;
		return (
			<Header inverted as='h1' size='huge' textAlign='left'>
				<Icon color='blue' name='braille' size='massive' />
				<Content>
					{name}
					<Subheader>{`${screen} version: ${version}`}</Subheader>
				</Content>
			</Header>
		);
	},
	Portal: ({
		open,
		transition,
		children,
		segmentClass,
		columnClass,
		verticalAlign,
	}: SenterPortalProps) => {
		const { TransitionablePortal, Segment, Grid } = Semantic;

		return (
			<TransitionablePortal open={open} transition={transition}>
				<Segment className={segmentClass}>
					<Grid verticalAlign={verticalAlign} centered>
						<Grid.Column className={columnClass}>{children}</Grid.Column>
					</Grid>
				</Segment>
			</TransitionablePortal>
		);
	},
	Screen: {
		Login: () => {
			const { Portal, Header } = Component;
			return (
				<Portal
					open={true}
					transition={{ animation: 'scale', duration: 500 }}
					verticalAlign='middle'
					segmentClass='Login'
					columnClass='Login'
				>
					<Header />
				</Portal>
			);
		},
		Dashboard: () => {},
		Account: () => {},
		Add: () => {},
		Purchase: () => {},
	},
};
