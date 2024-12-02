// types/toast.ts
export interface Toast {
    id: string;
    title?: string;
    description?: string;
    duration?: number;
    variant?: "default" | "destructive";
  }