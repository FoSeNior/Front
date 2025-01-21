interface PillAlarmData {
  date: string;
  hourTime: number;
  minTime: number;
  pillAlarmDetail: string;
}

export default interface PillAlarmType {
  success: boolean;
  message: string;
  data: PillAlarmData[];
}
