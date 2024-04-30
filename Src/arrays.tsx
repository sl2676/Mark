import { Icons } from './Icons';
import { DrawerScreen } from './DrawerScreen';
import { UMap } from './UserStack';
import { ProfileScreen } from './MarkInit/ProfileScreen';
import { MessageScreen } from './MarkInit/MessageScreen';
import { MarketScreen } from './MarkInit/MarketScreen';
import { SettingScreen } from './MarkInit/SettingScreen';
import { FeedScreen } from './MarkInit/FeedScreen';
import { FriendScreen } from './MarkInit/FriendScreen';
export const ScreensArray = [
	{ route: 'Explore', label: 'Explore', type: Icons.Entypo, icon: 'map', component: UMap },
	{ route: 'Profile', label: 'Profile', type: Icons.FontAwesome5, icon: 'user-alt', component: ProfileScreen },
	{ route: 'FeedScreen', label: 'Feed', type: Icons.Entypo, icon: 'list', component: FeedScreen },
	{ route: 'Social', label: 'Social', type: Icons.Feather, icon: 'users', component: MessageScreen },
	{ route: 'Settings', label: 'Settings', type: Icons.MaterialIcons, icon: 'settings', component: SettingScreen },

];

export const UserArray = [
	{ title: 'Market', icon: 'shopping-cart', color: 'black', iconType: Icons.FontAwesome5 },
	{ title: 'Wallet', icon: 'wallet', color: 'black', iconType: Icons.FontAwesome5 },
	{ title: 'Mint', icon: 'drive', color: 'black', iconType: Icons.Entypo }
];

export const ProfileArray = [
	{ label: ' Timeline', icon: 'history', iconType: Icons.MaterialIcons },
	{ label: ' Community', icon: 'group', iconType: Icons.FontAwesome },
	{ label: ' Share', icon: 'share', iconType: Icons.Entypo },
	{ label: ' Logout', icon: 'logout', iconType: Icons.MaterialIcons },	
];
