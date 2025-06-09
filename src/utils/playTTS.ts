import { Audio } from 'expo-av';

export async function playTTS(word: string, speed: number = 1.0) {
  try {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      word
    )}&tl=en&client=tw-ob`;

    const { sound } = await Audio.Sound.createAsync({ uri: url });
    await sound.setRateAsync(speed, true);
    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate((status) => {
      if ((status as any).didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.error('TTS Error:', error);
  }
}
