export interface Alert {
    icon: any; // any type because sweetalert2 doesn't match 'string' type for icons.
    title: string;
    text: string;
    buttonText: string;
}

export interface ConfirmableAlert extends Alert {
    confirmButtonText: string;
    cancelButtonText: string;
    successAlert: Alert;
}