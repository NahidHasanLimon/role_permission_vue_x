<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/signin">Sign in</router-link> |
      <router-link to="/account">Alex Garrett-Smith</router-link> |
      <a href="#">Sign out</a>
    </div>
    <router-view/>
  </div>
</template>