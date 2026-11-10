export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
<<<<<<< HEAD
}

// Yeni eklenen form data tipi:
export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string; // Inputtan string olarak gelir
  description: string;
  image?: string;
=======
>>>>>>> 5cc2ab86f04fc691be84451c896bca6e1b1d57d8
}