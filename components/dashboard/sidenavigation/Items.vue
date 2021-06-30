<template>
  <ul>
    <sidenav-item title="Dashboard" to="/">
      <dashboard-icon />
    </sidenav-item>

    <sidenav-item title="Projects" to="/admin/projects">
      <projects-icon />
    </sidenav-item>

    <sidenav-item title="My tasks" to="/admin/tasks">
      <tasks-icon />
    </sidenav-item>

    <sidenav-item title="Calendar" to="/admin/calendar">
      <calendar-icon />
    </sidenav-item>

    <sidenav-item title="Time Manage" to="/admin/time-manage">
      <time-manage-icon />
    </sidenav-item>

    <sidenav-item title="Reports" to="/admin/reports">
      <reports-icon />
    </sidenav-item>

    <sidenav-item title="Settings" to="/admin/settings">
      <settings-icon />
    </sidenav-item>

    <sidenav-item title="Documentation" to="/admin/documentation">
      <documentation-icon />
    </sidenav-item>
  </ul>
</template>

<script>
import SidenavItem from './Item.vue';

/* ICONS */
import TasksIcon from './icons/Tasks.vue';
import ReportsIcon from './icons/Reports.vue';
import CalendarIcon from './icons/Calendar.vue';
import SettingsIcon from './icons/Settings.vue';
import ProjectsIcon from './icons/Projects.vue';
import DashboardIcon from './icons/Dashboard.vue';
import TimeManageIcon from './icons/TimeManage.vue';
import DocumentationIcon from './icons/Documentation.vue';

export default {
  name: 'SidenavItems',
  components: {
    TasksIcon,
    ReportsIcon,
    SidenavItem,
    SettingsIcon,
    ProjectsIcon,
    CalendarIcon,
    DashboardIcon,
    TimeManageIcon,
    DocumentationIcon,
  },
};
</script>
