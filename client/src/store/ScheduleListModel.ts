export default interface ScheduleListModel {
  id: number;
  patientName: string;
  activityTime: number;
  activityTitle: string;
  activityNote?: string;
  isImportant: boolean;
  isComplete: boolean;
  isEdit: boolean;
}
