import Swal from 'sweetalert2';
import { Alert, ConfirmableAlert } from '../interfaces/alerts';
import { isDarkTheme } from '../helpers/themeHelper';

export const showConfirmableAlert = ( data: ConfirmableAlert ) => {
    Swal.fire({
        title: data.title,
        text: data.text,
        icon: data.icon,
        showCancelButton: true,
        confirmButtonText: data.confirmButtonText,
        cancelButtonText: data.cancelButtonText,
        color: isDarkTheme() ? '#fff' : '#000',
        background: isDarkTheme() ? '#3e4451' : '#fff',
    }).then((result) => {
        if(result.isConfirmed) showAlert(data.successAlert);
    })
}

export const showAlert = (data: Alert) => {
    Swal.fire({
        icon: data.icon,  
        title: data.title,
        text: data.text,
        confirmButtonText: data.buttonText,
        color: isDarkTheme() ? '#fff' : '#000',
        background: isDarkTheme() ? '#3e4451' : '#fff',
    });
};
