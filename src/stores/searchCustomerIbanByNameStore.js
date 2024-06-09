import { defineStore } from 'pinia';
import axios from '../axios_auth';
import Swal from 'sweetalert2';

export const searchCustomerIbanByName = defineStore('customer', {
    state: () => ({
        firstName: '',
        lastName: '',
        iban: null,
    }),
    actions: {
        async searchUser() {
            try {
                Swal.fire({
                    title: 'Loading...',
                    text: 'Please wait while searching for the IBAN',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });
                if (!this.firstName || !this.lastName) {
                    await Swal.fire("First Name and Last Name are required", "", "warning");
                    return;
                }

                const response = await axios.get(
                    `api/customers/iban/${this.firstName}/${this.lastName}`
                );
                if (response.status === 204) {
                    this.iban = null;
                    await Swal.fire("No IBAN found", "", "info");
                }
                else {
                    this.iban = response.data;
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    this.iban = null;
                    await Swal.fire("Bad Request", error.response.data, "info");
                }
                else if (error.response && error.response.status === 404) {
                    this.iban = null;
                    await Swal.fire("No IBAN found", "", "info");
                }
                else {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while searching for the IBAN: ' + error.message,
                    });
                }
            }
            finally {
                Swal.close();
            }
        },
    },
});
