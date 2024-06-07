
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
                const response = await axios.get(
                    `/api/customers/getIbanByCustomerName/${this.firstName}/${this.lastName}`
                );
                if (response.status === 204) {
                    this.iban = null;
                    Swal.fire("No IBAN found", "", "info");
                } else {
                    this.iban = response.data;
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.iban = null;
                    Swal.fire("No IBAN found", "", "info");
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while searching for the IBAN: ' + error.message,
                    });
                }
            }
        },
    },
});
