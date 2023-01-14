console.log(`
`);

onhashchange = e => {
  history.replaceState(null,"", e.oldURL);
};