import * as React from 'react';
import * as Semantic from 'semantic-ui-react';
import type { PortalProps } from '../../types/membership';

export const Portal = {
	Login: ({
		children,
		open = true,
		transition = { animation: 'scale', duration: 500 },
	}: PortalProps): JSX.Element => {
		const { TransitionablePortal, Segment, Grid } = Semantic;
		const { Column } = Grid;

		return (
			<TransitionablePortal open={open} transition={transition}>
				<Segment className='Login'>
					<Grid verticalAlign='middle' centered>
						<Column className='Login'>{children}</Column>
					</Grid>
				</Segment>
			</TransitionablePortal>
		);
	},
	Dashboard: ({
		children,
		open = true,
		transition = { animation: 'scale', duration: 500 },
	}: PortalProps) => {
		const { TransitionablePortal, Segment, Grid } = Semantic;
		const { Column } = Grid;

		return (
			<TransitionablePortal open={open} transition={transition}>
				<Segment className='Dashboard'>
					<Grid verticalAlign='middle' centered>
						<Column className='Dashboard'>{children}</Column>
					</Grid>
				</Segment>
			</TransitionablePortal>
		);
	},
	Account: ({
		children,
		open = true,
		transition = { animation: 'scale', duration: 500 },
	}: PortalProps): JSX.Element => {
		const { TransitionablePortal, Segment, Grid } = Semantic;
		const { Column } = Grid;

		return (
			<TransitionablePortal
				open={open}
				transition={transition}
				closeOnDocumentClick={false}
				closeOnEscape={false}
				closeOnDimmerClick={false}
				closeOnPortalMouseLeave={false}
			>
				<Segment className='Account'>
					<Grid>
						<Column className='Account'>{children}</Column>
					</Grid>
				</Segment>
			</TransitionablePortal>
		);
	},
	Add: ({
		children,
		open = true,
		transition = { animation: 'scale', duration: 500 },
	}: PortalProps): JSX.Element => {
		const { TransitionablePortal, Segment, Grid } = Semantic;

		React.useEffect((): void => {
			document.title = 'Add Membership';
		}, []);

		return (
			<TransitionablePortal open={open} transition={transition}>
				<Segment className='Add'>
					<Grid>
						<Grid.Column className='Add'>{children}</Grid.Column>
					</Grid>
				</Segment>
			</TransitionablePortal>
		);
	},
	Buy: ({
		children,
		open = true,
		transition = { animation: 'scale', duration: 500 },
	}: PortalProps): JSX.Element => {
		const { TransitionablePortal, Segment, Grid } = Semantic;

		return (
			<TransitionablePortal
				open={open}
				transition={transition}
				closeOnDocumentClick={false}
				closeOnEscape={false}
				closeOnDimmerClick={false}
				closeOnPortalMouseLeave={false}
			>
				<Segment className='Buy'>
					<Grid>
						<Grid.Column className='Buy'>{children}</Grid.Column>
					</Grid>
				</Segment>
			</TransitionablePortal>
		);
	},
	Receipt: ({
		children,
		open = true,
		transition = { animation: 'vertical flip', duration: 700 },
	}: PortalProps) => {
		const { TransitionablePortal, Segment } = Semantic;
		return (
			<TransitionablePortal
				open={open}
				transition={transition}
				closeOnDocumentClick={false}
				closeOnEscape={false}
				closeOnDimmerClick={false}
				closeOnPortalMouseLeave={false}
			>
				<Segment
					style={{
						paddingRight: 14,
						paddingLeft: 14,
						paddingTop: 20,
						left: '0%',
						right: '0%',
						top: '0%',
						zIndex: 1000,
						backgroundColor: '#002b487d',
					}}
				>
					{children}
				</Segment>
			</TransitionablePortal>
		);
	},
};

export default Portal;
