import Swal from "sweetalert2";

export  const toast=Swal.mixin({
    toast:true,
    showConfirmButton: false,
    showCancelButton: false,
    timerProgressBar:true,
    position:'top-end',
    timer:2000
})