// import JSONC from 'jsoncomp/versions/jsonc.min.js'
const gzip = require('gzip-js')

export function workspaceEntitiesToJSON(entities) {
  let entitiesJSON = {}
  entities.forEach(entity => {
    let entityJson = {
      type: 'dict',
      values: {}
    }
    entity.values.forEach(value => {
      entityJson.values[value.name] = value.synonyms
    })
    entitiesJSON[entity.name] = entityJson
  })
  return entitiesJSON
}
export function rawEntityJsonToEntities(rawEntities) {
  const entities = []
  for (let key in rawEntities) {
    let entity = { name: key, values: [] }
    let rawEntity = rawEntities[key]
    for (let valueKey in rawEntity.values) {
      entity.values.push({
        name: valueKey,
        synonyms: rawEntity.values[valueKey]
      })
    }
    entities.push(entity)
  }
  return entities
}
// export function workspaceToJSON(workspace) {
//   let workspaceJSON = {
//     name: workspace.name,
//     language: workspace.language,
//     country: workspace.country,
//     type: workspace.type,
//   }
//   return workspaceJSON
// }

export function compressJson(obj) {
  // let lzwString = JSONC.pack(obj)
  const bytes = gzip.zip(JSON.stringify(obj))
  let binary = ''
  const len = bytes.length
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  let outString = window.btoa(binary)
  return outString
}

export function base64Json(obj) {
  // let lzwString = JSONC.pack(obj)
  const binary = JSON.stringify(obj)
  // let binary = ''
  // const len = bytes.length
  // for (let i = 0; i < len; i++) {
  //   binary += String.fromCharCode(bytes[i])
  // }
  let outString = window.btoa(binary)
  return outString
}
export function unCompressJson(compressed) {
  let binaryString = window.atob(compressed)
  var rawLength = binaryString.length
  var array = new Array(new ArrayBuffer(rawLength))
  for (let i = 0; i < rawLength; i++) {
    array[i] = binaryString.charCodeAt(i)
  }
  const out = gzip.unzip(array)

  let binary = ''
  var len = out.length
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(out[i])
  }
  return JSON.parse(binary)
}
