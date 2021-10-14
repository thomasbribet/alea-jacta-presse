<template>
  <div>
    <p>Vous avez tout lu.</p>
    <br />
    <button>&#8634;</button>
  </div>
</template>

<script>
export default {
  props: {
    onClickAction: {
      type: Function,
    },
  },
};
</script>

<style scoped>
div {
  color: var(--text-color);
  background-color: var(--background-color);
  transform: translateY(-7%);
}
p {
  text-align: center;
  font-family: Helvetica, sans-serif;
  font-size: 1.4rem;
}
button {
  border: none;
  background-color: var(--background-color);
  font-size: 2rem;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}
</style>