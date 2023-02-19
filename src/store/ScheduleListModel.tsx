export default interface ScheduleListModel {
  id: number;
  patientName: string;
  activityTime: number;
  activityTitle: string;
  activityNote?: string;
  isComplete: boolean;
  isEdit: boolean;
}
