export interface UserData {
  id: number;
  encoded_user_id: string;
  first_name: string;
  total_shifts: number;
  total_hours_worked: number;
  last_minute_shifts: number;
  different_facilities: number;
  different_specializations: number;
  night_shifts: number;
  weekend_shifts: number;
  most_common_day: string;
  most_common_specialization: string;
  bucket: string;
  bucket_description: string;
  total_patients_impacted: number;
  patients_impact_description: string;
  morning_shifts: number;
  evening_shifts: number;
  preferred_time: string;
}

