<template>
  <ul>
    <sidenav-item title="Dashboard" to="/">
      <dashboard-icon />
    </sidenav-item>
    
    <sidenav-item title="Account register" to="/admin/account_register">
      <account-register/>
    </sidenav-item>

    <sidenav-item title="History Otp" to="/admin/history_otp">
      <history-otp/>
    </sidenav-item>
    <sidenav-item title="History Activity" to="/admin/history_activity">
      <history-activity/>
    </sidenav-item>
  </ul>
</template>

<script>
import SidenavItem from './Item.vue';

/* ICONS */
import DashboardIcon from './icons/Dashboard.vue';
import AccountRegister from './icons/AccountRegister.vue';
import HistoryOtp from './icons/HistoryOtp.vue';
import HistoryActivity from './icons/HistoryActivity.vue';

export default {
  name: 'SidenavItems',
  components: {
    SidenavItem,
    DashboardIcon,
    AccountRegister,
    HistoryOtp,
    HistoryActivity
  }
};

</script>
