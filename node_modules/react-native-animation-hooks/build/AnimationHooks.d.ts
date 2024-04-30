import { Animated } from 'react-native';
export declare const useAnimatedValue: (initialValue: number) => Animated.Value;
declare type AnimationType = 'spring' | 'timing';
interface BaseAnimationConfig {
    initialValue?: number;
    type?: AnimationType;
}
export declare type TimingAnimationConfig = BaseAnimationConfig & ({
    type: 'timing';
} & Animated.TimingAnimationConfig);
export declare type SpringAnimationConfig = BaseAnimationConfig & ({
    type: 'spring';
} & Animated.SpringAnimationConfig);
export declare type UseAnimationConfig = TimingAnimationConfig | SpringAnimationConfig;
export declare const useAnimation: (config: UseAnimationConfig) => Animated.Value;
export {};
