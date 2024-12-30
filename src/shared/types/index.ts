export interface Menu {
    id: string;
    name: string;
    days: Day[];
  }
  
  export interface Day {
    day: string;
    meals: Meal[];
  }
  
  export interface Meal {
    type: string;
    dish: string;
  }