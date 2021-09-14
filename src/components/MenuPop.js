import React from "react";
import { Popover, Button, Center, NativeBaseProvider } from "native-base";

export default function PopMenu({ onPress }) {
	return (
		<Popover
			trigger={(triggerProps) => {
				return (
					<Button size="xs" {...triggerProps}>
						Add To My Meds
					</Button>
				);
			}}
		>
			<Popover.Content accessibilityLabel="add to my meds" borderRadius={"xl"}>
				<Popover.Arrow />
				<Popover.CloseButton />
				<Popover.Header>Add to My Medications</Popover.Header>
				<Popover.Body>
					Are you sure you want to add this medication to 'My Medications'
				</Popover.Body>
				<Popover.Footer justifyContent="flex-end">
					<Button.Group>
						<Button size="sm" variant="ghost">
							Cancel
						</Button>
						<Button size="sm" onPress={onPress}>
							Yes
						</Button>
					</Button.Group>
				</Popover.Footer>
			</Popover.Content>
		</Popover>
	);
}
