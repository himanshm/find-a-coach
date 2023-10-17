<template>
    DETAILS FOR COACH
    <!-- render the child route of this component which is contact route -->
    <router-view></router-view>
    <!-- add a router-link to navigate to contact page through a dynamic id (hard-coded for now) -->
    <router-link to="/coaches/c1/contact">Contact</router-link>
</template>