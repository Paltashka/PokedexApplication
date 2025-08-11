declare module 'react-native-pedometer' {
  interface PedometerData {
    numberOfSteps: number;
    distance: number;
  }

  export default class Pedometer {
    static startPedometerUpdates(callback: (data: PedometerData) => void): void;
    static stopPedometerUpdates(): void;
  }
}