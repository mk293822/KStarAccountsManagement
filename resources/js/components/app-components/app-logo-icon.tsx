import * as Avatar from '@radix-ui/react-avatar';

export default function AppLogoIcon() {
	return (
		<Avatar.Root className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-100">
			<Avatar.Image className="h-full w-full object-cover" src="/logo.jpg" alt="App Logo" />
			<Avatar.Fallback className="text-sm text-gray-500">K</Avatar.Fallback>
		</Avatar.Root>
	);
}
