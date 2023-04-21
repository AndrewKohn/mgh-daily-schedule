export default interface ScheduleListModel {
  id: number;
  patientName: string;
  activityTime: number;
  activityTitle: string;
  activityNote?: string;
  isImportant: number;
  isComplete: boolean;
  isEdit: boolean;
}
