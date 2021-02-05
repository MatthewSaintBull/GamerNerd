<script>
  import { Router, Route, navigate } from "svelte-routing";
  import "bulma/css/bulma.css";
  import "./Navbar.svelte";
  import Navbar from "./Navbar.svelte";
  import Container from "./Container.svelte";

	const api =  __gamerNerd.env.api
	const port =  __gamerNerd.env.port
  var sezioni = {};

  fetch("http://"+api+":"+port+"/database/db.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => (sezioni = data.sezioni));
</script>

<main>
  <Router url="">
    <Navbar {sezioni} />
    <div>
      {#each sezioni as sezione}
        <Route
          path={sezione.path}
          component={Container}
          id_sezione={sezione.id}
          isHome={sezione.path == "/" ? true : false}
        />
      {/each}
    </div>
  </Router>
</main>

<style>
</style>
