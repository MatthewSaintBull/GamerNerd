<script>
  export let id_sezione
  export let isHome
</script>
{
  #if isHome
}
  <h1>Articoli in home</h1>
{
  /if
}
<h1>categoria articolo {id_sezione}</h1>