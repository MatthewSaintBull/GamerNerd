<script>
  import {Link} from "svelte-routing"

  export let sezioni
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img
        src="https://bulma.io/images/bulma-logo.png"
        width="112"
        height="28"
        alt="brand"
      />
    </a>
  </div>
  <div id="navbarBasicExample" class="navbar-menu">
    {#each sezioni as sezione}
    <Link to="{sezione.path}" class="navbar-item">{sezione.nome}</Link>
    {/each}
  </div>
</nav>
