import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'tinyforce',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
