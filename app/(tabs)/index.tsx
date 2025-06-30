import { Image } from 'expo-image';
import { Alert, Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CoolButton } from '@/components/ui/CoolButton';

export default function HomeScreen() {
  // 处理按钮点击事件
  const handleCoolButtonPress = () => {
    Alert.alert(
      '酷炫按钮被点击了！🎉',
      '这个按钮有着炫酷的动画效果，包括:\n• 按下缩放动画\n• 发光效果\n• 颜色渐变\n• 旋转动画',
      [
        {
          text: '再次体验',
          style: 'default',
        },
        {
          text: '太酷了！',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      
      {/* 酷炫按钮区域 */}
      <ThemedView style={styles.buttonContainer}>
        <ThemedText type="subtitle" style={styles.buttonTitle}>
          体验酷炫按钮
        </ThemedText>
        <ThemedText style={styles.buttonDescription}>
          这是一个具有多种动画效果的现代化按钮组件
        </ThemedText>
        
        {/* 渐变按钮 */}
        <CoolButton
          title="🚀 点击体验魔法"
          variant="gradient"
          size="large"
          onPress={handleCoolButtonPress}
        />
        
        {/* 按钮组合演示 */}
        <ThemedView style={styles.buttonRow}>
          <CoolButton
            title="主要"
            variant="primary"
            size="medium"
            onPress={() => Alert.alert('主要按钮', '这是一个主要按钮！')}
          />
          <CoolButton
            title="次要"
            variant="secondary"
            size="medium"
            onPress={() => Alert.alert('次要按钮', '这是一个次要按钮！')}
          />
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  // 新增的按钮相关样式
  buttonContainer: {
    gap: 16,
    marginBottom: 24,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonTitle: {
    textAlign: 'center',
    marginBottom: 4,
  },
  buttonDescription: {
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 12,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
});
