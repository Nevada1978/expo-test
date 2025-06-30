import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, {
    interpolateColor,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface CoolButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export function CoolButton({ 
  title, 
  onPress, 
  variant = 'gradient',
  size = 'medium',
  disabled = false 
}: CoolButtonProps) {
  // 动画值
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const glowOpacity = useSharedValue(0);
  const colorProgress = useSharedValue(0);

  // 按钮尺寸配置
  const sizeConfig = {
    small: { height: 40, paddingX: 16, fontSize: 14 },
    medium: { height: 48, paddingX: 20, fontSize: 16 },
    large: { height: 56, paddingX: 24, fontSize: 18 },
  };

  const buttonConfig = sizeConfig[size];

  // 处理按下动画
  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 200 });
    glowOpacity.value = withTiming(1, { duration: 200 });
    colorProgress.value = withTiming(1, { duration: 300 });
  };

  // 处理释放动画
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    glowOpacity.value = withTiming(0, { duration: 300 });
    colorProgress.value = withTiming(0, { duration: 300 });
  };

  // 处理点击事件
  const handlePress = () => {
    if (disabled) return;
    
    // 旋转动画
    rotation.value = withSpring(rotation.value + 360, 
      { damping: 20, stiffness: 200 },
      () => {
        rotation.value = 0; // 重置旋转值
      }
    );

    // 执行回调
    if (onPress) {
      runOnJS(onPress)();
    }
  };

  // 按钮动画样式
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ],
    };
  });

  // 发光效果动画样式
  const animatedGlowStyle = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value,
      transform: [{ scale: 1 + glowOpacity.value * 0.1 }],
    };
  });

  // 渐变色动画样式
  const animatedGradientStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      ['rgba(59, 130, 246, 1)', 'rgba(147, 51, 234, 1)'] // 从蓝色到紫色
    );
    
    return {
      backgroundColor: variant === 'gradient' ? undefined : backgroundColor,
    };
  });

  // 渲染不同变体的按钮
  const renderButton = () => {
    const baseClasses = `
      items-center justify-center rounded-2xl
      ${disabled ? 'opacity-50' : ''}
    `;

    const textClasses = `
      font-bold text-white
      ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'}
    `;

    if (variant === 'gradient') {
      return (
        <>
          {/* 发光背景层 */}
          <Animated.View 
            style={[
              animatedGlowStyle,
              {
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: 16,
                backgroundColor: 'rgba(59, 130, 246, 0.3)',
                shadowColor: '#3b82f6',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 20,
                elevation: 10,
              }
            ]} 
          />
          
          {/* 渐变按钮主体 */}
          <AnimatedLinearGradient
            colors={['#3b82f6', '#8b5cf6', '#ec4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              {
                width: '100%',
                height: buttonConfig.height,
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: buttonConfig.paddingX,
              },
              animatedGradientStyle,
            ]}
          >
            <Text className={textClasses}>
              {title}
            </Text>
          </AnimatedLinearGradient>
        </>
      );
    } else {
      // 普通按钮样式
      const variantClasses = variant === 'primary' 
        ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
        : 'bg-gray-600 shadow-lg shadow-gray-500/50';
      
      return (
        <Animated.View 
          className={`${baseClasses} ${variantClasses}`}
          style={[
            {
              height: buttonConfig.height,
              paddingHorizontal: buttonConfig.paddingX,
            },
            animatedGradientStyle,
          ]}
        >
          <Text className={textClasses}>
            {title}
          </Text>
        </Animated.View>
      );
    }
  };

  return (
    <AnimatedTouchableOpacity
      style={[animatedButtonStyle, { position: 'relative' }]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.9}
    >
      {renderButton()}
    </AnimatedTouchableOpacity>
  );
} 