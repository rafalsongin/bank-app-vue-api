<template>
  <div class="text-center withdraw-container">
    <h2 class="mb-4">Withdraw</h2>
    <form @submit.prevent="withdraw">
      <div class="mb-3">
        <label for="amount" class="form-label">Amount</label>
        <input v-model="amount" id="amount" type="number" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="button" class="btn btn-secondary" @click="goBack">Back</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      amount: 0
    };
  },
  methods: {
    async withdraw() {
      try {
        await axios.post('http://localhost:8080/atm/withdraw', {
          amount: this.amount
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Withdrawal successful',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.$emit('update-balance');
        });
        this.goBack();
      } catch (error) {
        console.error('Error making withdrawal:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to make withdrawal',
          showConfirmButton: true
        });
      }
    },
    goBack() {
      this.$emit('go-back');
    }
  }
}
</script>

<style scoped>
.withdraw-container {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #30323d;
}

label {
  color: #4D5061;
  font-weight: bold;
}

.form-control {
  border: 2px solid #E8C547;
  border-radius: 5px;
  padding: 10px;
  width: 75%; /* Adjust input box size */
  margin: 0 auto;
}

.form-control:focus {
  border-color: #E8C547;
  box-shadow: 0 0 5px rgba(232, 197, 71, 0.5);
}

.btn-primary {
  background-color: #E8C547;
  border: none;
  color: #30323d;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #d4ae42;
}

.btn-secondary {
  background-color: #4D5061;
  border: none;
  color: #FFF;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 10px;
  transition: background-color 0.3s;
}

.btn-secondary:hover {
  background-color: #424556;
}

button {
  margin-top: 10px;
}
</style>
