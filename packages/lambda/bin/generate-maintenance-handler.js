// generate-maintenance-handler
//
// The maintenance handlers are almost same as the incidents handlers.
// This script generates the maintenance handlers from the incidents ones by simply replacing some tokens.

const fs = require('fs')

const header = '// Code generated by generate-maintenance-handler. DO NOT EDIT.\n/* eslint-disable */\n'

const generateMaintenanceHandler = (inputFilename, outputFilename) => {
  let buff = fs.readFileSync(inputFilename).toString()
  const patternAndRepls = [
    {pattern: /incident/g, repl: 'maintenance'},
    {pattern: /Incident/g, repl: 'Maintenance'}
  ]

  patternAndRepls.forEach(p => {
    buff = buff.replace(p.pattern, p.repl)
  })

  fs.writeFileSync(outputFilename, header + buff)
}

const srcAndDests = [
  {src: 'deleteIncidents', dest: 'deleteMaintenances'},
  {src: 'getIncidents', dest: 'getMaintenances'},
  {src: 'getIncident', dest: 'getMaintenance'},
  {src: 'patchIncidentUpdates', dest: 'patchMaintenanceUpdates'},
  {src: 'patchIncidents', dest: 'patchMaintenances'},
  {src: 'postIncidents', dest: 'postMaintenances'}
]
srcAndDests.forEach(s => {
  generateMaintenanceHandler(`./src/api/${s.src}/index.js`, `./src/api/${s.dest}/index.js`)
  generateMaintenanceHandler(`./test/api/${s.src}/index.js`, `./test/api/${s.dest}/index.js`)
})