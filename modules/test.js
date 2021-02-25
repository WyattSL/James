function ready(client) {
  console.log("Module test succeeded.");
}

module.module = {
  "events": [
    {
      "type": "ready",
      "run": ready
    }
  ]
}
