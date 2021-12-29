export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  imgPath: string;
  state?: 'Completed' | 'Cancelled' | null;
}
